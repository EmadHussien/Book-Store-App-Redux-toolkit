import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk('book/getBooks',async(_,thunkAPI)=>{
    const {rejectWithValue} =thunkAPI;
    try{
/*         const res = await fetch('http://localhost:3005/books'); 
 */         const res = await fetch('https://6299f8436f8c03a9784de792.mockapi.io/books');
            const data = await res.json();
        return data;
    }
    catch(e){
        return rejectWithValue(e.message);
    }
});


// create new thunk for inserting data into api.
export const insertBooks = createAsyncThunk('book/insertBooks',async(booksData,thunkAPI)=>{
    const {rejectWithValue , getState} =thunkAPI;
    try{
/*         const res = await fetch('https://6299f8436f8c03a9784de792.mockapi.io/books');
 */
        booksData.userName = getState().auth.author;
        const res = await fetch('https://6299f8436f8c03a9784de792.mockapi.io/books',{
            method: 'POST',
            body:JSON.stringify(booksData),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        });
        const data = await res.json();
        return data;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});

// create new thunk for inserting data into api.
export const deleteBooks = createAsyncThunk('book/deleteBooks',async(id,thunkAPI)=>{
    const {rejectWithValue } =thunkAPI;
    try{
        await fetch(`https://6299f8436f8c03a9784de792.mockapi.io/books/${id}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        });
        return id;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});



const bookSlice = createSlice({
    name:'book',
    initialState : {books:[] , isLoading:false, error:null},
    extraReducers:{
        // get all books
        [getBooks.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [getBooks.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.books = action.payload;
        },
        [getBooks.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
       
        // insert a new book
        [insertBooks.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [insertBooks.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.books.push(action.payload);
        },
        [insertBooks.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },

         // delete specific book
         [deleteBooks.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [deleteBooks.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.books = state.books.filter(item => item.id !== action.payload)
        },
        [deleteBooks.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },


        

    }
})

export default bookSlice.reducer;