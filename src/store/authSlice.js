import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../services/api.js'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
}

// 🔐 Login
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', credentials)
    const token = response.data.token
    const user = response.data.user

    thunkAPI.dispatch(authSlice.actions.setToken(token))
    thunkAPI.dispatch(authSlice.actions.setUser(user))
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    // Fetch full profile
    const profileResponse = await axios.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })

    thunkAPI.dispatch(authSlice.actions.setUser(profileResponse.data))
    localStorage.setItem('user', JSON.stringify(profileResponse.data))

    return { token, user: profileResponse.data }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed')
  }
})

// 🆕 Register
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/auth/register', userData, {
      headers: { 'Content-Type': 'application/json' }
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed')
  }
})

// 👤 Fetch Profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token
    const response = await axios.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching profile')
  }
})

// ✏️ Update Profile
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (updatedData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token
    const response = await axios.put('/auth/profile', updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update profile')
  }
})

// 🚪 Logout
export const logoutUser = () => (dispatch) => {
  dispatch(authSlice.actions.logout())
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// 🧩 Slice
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setUser, setToken, logout } = authSlice.actions
export default authSlice.reducer
