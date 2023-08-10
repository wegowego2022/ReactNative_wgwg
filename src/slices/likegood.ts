import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Item = {
    id: number;
    title: string;
    titleInfo: string;
    price: string;
    type: string;
    image: any;
    subimage: any;
  };
interface LikeState {
  items: Item[];
}

const initialState: LikeState = {
  items: [],
};

const goodSlice = createSlice({
  name: 'likegood',
  initialState,
  reducers: {
    addLikedItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    removeLikedItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
  },
  extraReducers: (builder) => {},
});

export const { addLikedItem, removeLikedItem } = goodSlice.actions;
export default goodSlice;
