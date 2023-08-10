import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Item = {
  id: number;
  title: string;
  age: string;
  year: string;
  episodeNum: string;
  titleInfo: string;
  cast: string; 
  type: string;
  image: string;
//
time: string;
operationHours: {
  [key: string]: string;
};
phone: string;
etc: string;

episode: string;
address: string;
way: string;
subimage: string;
};
interface LikeState {
  items: Item[];
}

const initialState: LikeState = {
  items: [],
};

const likeSlice = createSlice({
  name: 'like',
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

export const { addLikedItem, removeLikedItem } = likeSlice.actions;
export default likeSlice;
