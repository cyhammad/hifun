"use client";

import React, { useState } from "react";
import { Mail, Eye, EyeOff, Pencil, Check, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Password input component with show/hide toggle - MUST be outside the main component
function PasswordInput({ value, onChange, placeholder, show, onToggle }) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[44px] px-4 pr-12 bg-[#1A1A1A] border border-[#404040] rounded-[8px] text-white text-[14px] placeholder:text-[#666] focus:outline-none focus:border-[#582BB3] transition-colors"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-white transition-colors"
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}

export function PersonalDetailsCard({ user }) {
  const [displayName, setDisplayName] = useState(user?.displayName || user?.email?.split("@")[0] || "Admin");
  const [email, setEmail] = useState(user?.email || "");

  // Combined Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(displayName);
  const [editedEmail, setEditedEmail] = useState(email);
  const [savingDetails, setSavingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  // Password change dialog state
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Handle save details (Name & Email)
  const handleSaveDetails = async () => {
    setDetailsError(null);

    // Validation
    if (!editedName.trim()) {
      setDetailsError("Name cannot be empty");
      return;
    }
    if (!editedEmail.trim()) {
      setDetailsError("Email cannot be empty");
      return;
    }
    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedEmail)) {
      setDetailsError("Invalid email format");
      return;
    }

    setSavingDetails(true);

    try {
      const payload = {
        displayName: editedName.trim(),
        email: editedEmail.trim() !== email ? editedEmail.trim() : undefined
      };

      const res = await fetch("/api/admin/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setDisplayName(editedName.trim());
        if (payload.email) setEmail(payload.email);
        setIsEditing(false);
      } else {
        const data = await res.json();
        setDetailsError(data.error || "Failed to update details");
      }
    } catch (err) {
      console.error("Error updating details:", err);
      setDetailsError("Failed to update details");
    } finally {
      setSavingDetails(false);
    }
  };

  // Toggle Edit Mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Just cancel? Or save? The button says "Save Details" when confirmed.
      // If clicking "Edit Details" triggers edit mode. 
      // If clicking "Save Details", triggers save.
      // User said: "The edit details button converts to save details button"
      // So this function logic will be split in the JSX mostly.
      handleSaveDetails();
    } else {
      setEditedName(displayName);
      setEditedEmail(email);
      setIsEditing(true);
      setDetailsError(null);
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    setPasswordError(null);

    // Validation
    if (!currentPassword) {
      setPasswordError("Current password is required");
      return;
    }
    if (!newPassword) {
      setPasswordError("New password is required");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError("New password cannot be the same as current password");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordSuccess(true);
        setTimeout(() => {
          setPasswordDialogOpen(false);
          resetPasswordForm();
        }, 1500);
      } else {
        setPasswordError(data.error || "Failed to change password");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setPasswordError("Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  // Reset password form
  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setPasswordError(null);
    setPasswordSuccess(false);
  };

  return (
    <div className="flex flex-col gap-6 flex-1 font-roboto">
      <h2
        className="text-white text-[24px] font-semibold"
        style={{ fontFamily: "var(--font-red-hat-display)" }}
      >
        Personal Details
      </h2>

      <div className="bg-transparent border border-[#404040] rounded-[16px] p-[24px] flex flex-col gap-6 w-full">
        <div className="flex flex-wrap gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2 min-w-[180px] flex-1">
            <span className="text-[#717171] text-[12px] font-normal">Name</span>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="h-[44px] px-3 bg-[#1A1A1A] border border-[#404040] rounded-[8px] text-white text-[16px] focus:outline-none focus:border-[#582BB3] transition-colors w-full"
              />
            ) : (
              <span className="text-white text-[16px] font-normal h-[44px] flex items-center">{displayName}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 min-w-[180px] flex-1">
            <span className="text-[#717171] text-[12px] font-normal">Email</span>
            {isEditing ? (
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="h-[44px] px-3 bg-[#1A1A1A] border border-[#404040] rounded-[8px] text-white text-[16px] focus:outline-none focus:border-[#582BB3] transition-colors w-full"
              />
            ) : (
              <div className="flex items-center gap-2 h-[44px]">
                <Mail className="w-4 h-4 text-[#717171]" />
                <span className="text-white text-[16px] font-normal">{email}</span>
              </div>
            )}
          </div>
        </div>

        {detailsError && (
          <p className="text-red-400 text-sm">{detailsError}</p>
        )}

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <span className="text-[#717171] text-[12px] font-normal">Password</span>
          <div className="flex items-center justify-between h-[44px]">
            <span className="text-white text-[16px] font-normal tracking-widest">
              ••••••••••
            </span>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setPasswordDialogOpen(true)}
                className="text-[#582BB3] hover:text-[#7245f0] text-[14px] font-medium transition-colors"
              >
                Change Password
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Save Details Button */}
      <button
        type="button"
        onClick={toggleEditMode}
        disabled={savingDetails}
        className="w-fit px-8 h-[44px] bg-[#582BB3] hover:bg-[#7245f0] text-white font-medium text-[14px] rounded-[24px] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {savingDetails ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : isEditing ? (
          "Save Details"
        ) : (
          "Edit Details"
        )}
      </button>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={(open) => {
        setPasswordDialogOpen(open);
        if (!open) resetPasswordForm();
      }}>
        <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] border-[#404040]">
          <DialogHeader>
            <DialogTitle className="text-white text-[20px]">Change Password</DialogTitle>
          </DialogHeader>

          {passwordSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-white text-[16px]">Password changed successfully!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#717171] text-[12px]">Current Password</label>
                <PasswordInput
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  placeholder="Enter current password"
                  show={showCurrentPassword}
                  onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#717171] text-[12px]">New Password</label>
                <PasswordInput
                  value={newPassword}
                  onChange={setNewPassword}
                  placeholder="Enter new password"
                  show={showNewPassword}
                  onToggle={() => setShowNewPassword(!showNewPassword)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#717171] text-[12px]">Confirm New Password</label>
                <PasswordInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Confirm new password"
                  show={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>

              {passwordError && (
                <span className="text-red-400 text-[13px]">{passwordError}</span>
              )}
            </div>
          )}

          {!passwordSuccess && (
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setPasswordDialogOpen(false)}
                className="border-[#404040] text-white hover:bg-[#262626]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={savingPassword}
                className="bg-[#582BB3] hover:bg-[#7245f0] text-white"
              >
                {savingPassword ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Change Password
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

