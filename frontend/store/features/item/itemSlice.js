import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/store/axios";

// Async Thunks
export const addItem = createAsyncThunk("items/add", async (item) => {
  const response = await axios.post("/api/items/", item);
  return response.data;
});

export const updateItem = createAsyncThunk(
  "items/update",
  async ({ id, updatedData }) => {
    const response = await axios.put(`/api/items/${id}/`, updatedData);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk("items/delete", async (id) => {
  await axios.delete(`/api/items/${id}/`);
  return id;
});

export const fetchItems = createAsyncThunk('items/fetch', async (_, { getState } ) => {
  const state = getState().item;
  const params={};
  if(state.searchTerm) params["search"] = state.searchTerm;  
  if(state.orderByField) params["ordering"] = `${state.orderAscending=="asc" ? '' : '-'}${state.orderByField}`
  if(state.quantityRange) {
    params["quantity__gte"] = state.quantityRange["min"]
    params["quantity__lte"] = state.quantityRange["max"]
  }
  const response = await axios.get('/api/items',{
    params
  });
  return response.data;
});

export const fecthItemsWithLink = createAsyncThunk('items/fetchWithLink', async (url) => {
  const response = await axios.get(url);
  return response.data;
});
// Slice
const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchTerm: undefined,
    quantityRange: undefined, // can be {min:0, max:0}
    orderByField: undefined, // can be name, location, quantity
    orderAscending: "asc", // can be 'asc or 'desc',
    nextLink: undefined,
    prevLink: undefined,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setQuantityRange: (state, action) => {
      state.quantityRange = action.payload;
    },
    setSortField: (state, action) => {
      state.orderByField = action.payload.field;
      state.orderAscending = action.payload.asc
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action)=>{
        console.log(action)
        state.loading = false;
        state.items = action.payload["results"]
        state.nextLink = action.payload["next"] 
        state.prevLink = action.payload["previous"]
        state.currentPageNumber = 1
      })
      .addCase(fetchItems.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(fecthItemsWithLink.pending, (state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(fecthItemsWithLink.fulfilled, (state, action)=>{
        state.loading = false;
        state.items = action.payload["results"]
        state.nextLink = action.payload["next"] 
        state.prevLink = action.payload["previous"]
        state.currentPageNumber = 1
      })
      .addCase(fecthItemsWithLink.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const itemActions = itemSlice.actions
export default itemSlice.reducer;
