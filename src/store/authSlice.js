import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../services/api.js'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', credentials)

    const token = response.data.token
    const user = response.data.user

    // שמור ב-Redux
    thunkAPI.dispatch(authSlice.actions.setToken(token))
    thunkAPI.dispatch(authSlice.actions.setUser(user))

    // שמור ב-localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    // קרא ל-fetchUserProfile עם token ידני
    const profileResponse = await axios.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })

    // עדכן את המשתמש שוב אם צריך
    thunkAPI.dispatch(authSlice.actions.setUser(profileResponse.data))

    return { token, user: profileResponse.data }

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed')
  }
})




// Async action: Register
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    console.log("User data being sent for registration:", userData);  // הדפס את הנתונים
    const response = await axios.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json',  // קובע את סוג התוכן לשליחה
      }
    });
    return response.data;  // אם הכל עבר בהצלחה
  } catch (error) {
    console.error("Error during registration: ", error.response);  
    console.log("Error response:", error.response);  // הדפסת שגיאת ה-401 במלואה

    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});




// Fetch User Profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token  // מקבל את ה-token מ-Redux
    const response = await axios.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching profile')
  }
})

// Logout Action
export const logoutUser = () => (dispatch) => {
  dispatch(authSlice.actions.logout())
}

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchUserProfile.pending, (state) => { state.loading = true })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
