"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SubscriptionPlan = "basic" | "premium" | "premium-plus";

type User = {
  email: string;
  subscribed: boolean;
  plan: SubscriptionPlan;
  trialActive?: boolean;
};

type AuthState = {
  user: User | null;
  loggedIn: boolean;
  modalOpen: boolean;
};

const initialState: AuthState = {
  user: null,
  loggedIn: false,
  modalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    login(state, action: PayloadAction<{ email: string }>) {
      state.user = { email: action.payload.email, subscribed: false, plan: "basic" };
      state.loggedIn = true;
      state.modalOpen = false;
    },
    register(state, action: PayloadAction<{ email: string }>) {
      state.user = { email: action.payload.email, subscribed: false, plan: "basic" };
      state.loggedIn = true;
      state.modalOpen = false;
    },
    guestLogin(state) {
      state.user = { email: "guest@gmail.com", subscribed: false, plan: "basic" };
      state.loggedIn = true;
      state.modalOpen = false;
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
    },
    setSubscribed(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.subscribed = action.payload;
      }
    },
    setPlan(state, action: PayloadAction<SubscriptionPlan>) {
      if (state.user) {
        state.user.plan = action.payload;
      }
    },
    setTrial(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.trialActive = action.payload;
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  login,
  register,
  guestLogin,
  logout,
  setSubscribed,
  setPlan,
  setTrial,
} = authSlice.actions;

export const authReducer = authSlice.reducer;