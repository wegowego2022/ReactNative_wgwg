import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Item = {
    id: number;
    title: string;
    titleInfo: string;
    time: string;
    operationHours: {
        [key: string]: string;
    };
    phone: string;
    etc: string;
    type: string;
    episode: string;
    address: string;
    way: string;
    image: any;
    subimage: any;
};
interface LikeState {
  items: Item[];
}

const initialState: LikeState = {
  items: [],
};

const placeSlice = createSlice({
  name: 'likeplace',
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

export const { addLikedItem, removeLikedItem } = placeSlice.actions;
export default placeSlice;
