import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    findName: '이상한 변호사 우영우',
    findSeries: '시리즈',
    findEpisode: '1',
    findHour: '01',
    findMinute: '30',
    findSecond: '20',
    findText: '찾아주세요 제발!!살려주세요!',
    findImage: 'https://newsimg-hams.hankookilbo.com/2022/07/05/4417c9ab-e4d8-4350-a85e-eba506b5f1c4.jpg',
};
const findSlice = createSlice({
    name: 'find',
    initialState,
    reducers: {
        setFind(state, action) {
            state.findName = action.payload.findName;
            state.findSeries = action.payload.findSeries;
            state.findEpisode = action.payload.findEpisode;
            state.findHour = action.payload.findHour;
            state.findMinute = action.payload.findMinute;
            state.findSecond = action.payload.findSecond;
            state.findText = action.payload.findText;
            state.findImage = action.payload.findImage;
        },
    },
    extraReducers: (builder) => {},
});

export default findSlice;