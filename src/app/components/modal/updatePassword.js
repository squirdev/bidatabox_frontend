"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { useLanguage } from "../../../../context/LanguageProvider";
import { isValidCredit } from "@/app/helper";
import { updateUserCredit } from "@/app/api/user";
import { useAlert } from "../../../../context/alertContext";

const UpdatePasswordModal = ({ open, setOpen }) => {
  const { showAlert } = useAlert();
  const [newUserName, setNewUserName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const handleOpen = () => setOpen(!open);

  const handleUpdatePassword = async () => {
    const checkValid = isValidCredit({
      name: newUserName,
      oldPassword,
      newPassword,
      confirmPassword,
    });
    if (!checkValid.valid) {
      setAlertMessage(checkValid.message);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updateUserCredit({
        newUserName,
        oldPassword,
        newPassword,
      });
      console.log(result);
      if (result.success) {
        showAlert(result.data.message, "success");
      } else {
        showAlert(result.data.message);
      }
    } catch (error) {
      console.log("error while changing credit", error);
    } finally {
      setIsLoading(false);
      setOpen(!open);
    }
  };

  return (
    <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          {t("changePassword")}
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <AiOutlineClose className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-8 pb-8">
        <Typography color="red" variant="small">
          {alertMessage}
        </Typography>
        <Input
          size="lg"
          type="text"
          value={newUserName}
          label={t("newUserName")}
          placeholder={t("newUserNameDesc")}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <Input
          size="lg"
          type="password"
          value={oldPassword}
          label={t("oldPassword")}
          placeholder={t("oldPasswordDesc")}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          size="lg"
          type="password"
          value={newPassword}
          label={t("newPassword")}
          placeholder={t("newPasswordDesc")}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          size="lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label={t("confirmPassword")}
          placeholder={t("confirmPasswordDesc")}
          type="password"
        />
      </DialogBody>
      <DialogFooter className="flex items-end gap-2">
        <Button color="blue-gray" onClick={handleOpen}>
          {t("cancel")}
        </Button>
        <Button color="red" loading={isLoading} onClick={handleUpdatePassword}>
          {t("submit")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdatePasswordModal;
