
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define base URL for API
const API_URL = 'http://localhost:5000';

// Helper function to calculate summary
const calculateSummary = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const saved = subtotal * 0.1; // 10% discount
  const total = subtotal - saved;
  return { subtotal, saved, total };
};

// Function to save state to localStorage
const saveStateToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error('Could not save state to local storage', e);
  }
};

// Function to load state from localStorage
const loadStateFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error('Could not load state from local storage', e);
    return undefined;
  }
};

// Async thunk to fetch orders from the backend
export const fetchOrders = createAsyncThunk(
  'cart/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/order`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadStateFromLocalStorage('cartItems') || [],
    orders: loadStateFromLocalStorage('orders') || [],
    subtotal: 0,
    saved: 0,
    total: 0,
    subtotalAllItems: 0,
    savedAllItems: 0,
    totalAllItems: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.items.some(item => item.id === action.payload.id);
      if (!itemExists) {
        state.items.push(action.payload);
      }
      const summaryAllItems = calculateSummary(state.items);
      state.subtotal = summaryAllItems.subtotal;
      state.saved = summaryAllItems.saved;
      state.total = summaryAllItems.total;
      state.subtotalAllItems = summaryAllItems.subtotal;
      state.savedAllItems = summaryAllItems.saved;
      state.totalAllItems = summaryAllItems.total;

      // Save updated cart to localStorage
      saveStateToLocalStorage('cartItems', state.items);
      
      // Optionally, save updated cart to backend
      axios.post(`${API_URL}/cart`, state.items).catch((error) => console.error('Error saving cart:', error));
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
    
      // Remove item from state
      state.items = state.items.filter(item => item.id !== itemIdToRemove);
    
      // Calculate and update summary
      const summaryAllItems = calculateSummary(state.items);
      state.subtotal = summaryAllItems.subtotal;
      state.saved = summaryAllItems.saved;
      state.total = summaryAllItems.total;
      state.subtotalAllItems = summaryAllItems.subtotal;
      state.savedAllItems = summaryAllItems.saved;
      state.totalAllItems = summaryAllItems.total;
    
      // Save updated cart to localStorage
      saveStateToLocalStorage('cartItems', state.items);
    
      // Delete item from backend
      axios.delete(`${API_URL}/cart/${itemIdToRemove}`)
        .then(response => {
          console.log('Item deleted from MongoDB:', response.data);
        })
        .catch(error => {
          console.error('Error deleting item from MongoDB:', error.response ? error.response.data : error.message);
        });
    },
    
    
    checkout: (state) => {
      const order = {
        items: state.items,
        subtotal: state.subtotal,
        saved: state.saved,
        total: state.total,
        date: new Date().toISOString(),
      };

      // Save order to backend
      axios.post(`${API_URL}/order`, order).then(() => {
        state.orders.push(order);
        state.items = [];
        state.subtotal = 0;
        state.saved = 0;
        state.total = 0;
        state.subtotalAllItems = 0;
        state.savedAllItems = 0;
        state.totalAllItems = 0;

        // Save updated orders and cleared cart to localStorage
        saveStateToLocalStorage('orders', state.orders);
        saveStateToLocalStorage('cartItems', state.items);
      }).catch((error) => console.error('Error saving order:', error));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectIsItemInCart = (state, itemId) => state.cart.items.some(item => item.id === itemId);
export const selectCartItemsCount = (state) => state.cart.items.length;
export const selectOrders = (state) => state.cart.orders;
export const selectAllItemsSummary = (state) => ({
  subtotalAllItems: state.cart.subtotalAllItems,
  savedAllItems: state.cart.savedAllItems,
  totalAllItems: state.cart.totalAllItems,
});

export const { addItem, removeItem, checkout } = cartSlice.actions;
export default cartSlice.reducer;






