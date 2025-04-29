import React from "react";
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

const UpdatePasswordModal = ({ open, setOpen }) => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const handleOpen = () => setOpen(!open);

  const handleUpdatePassword = () => {
    setOpen(!open);
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
        <Input
          size="lg"
          label={t("oldPassword")}
          placeholder={t("oldPasswordDesc")}
          type="password"
        />
        <Input
          size="lg"
          label={t("newPassword")}
          placeholder={t("newPasswordDesc")}
          type="password"
        />
        <Input
          size="lg"
          label={t("confirmPassword")}
          placeholder={t("confirmPasswordDesc")}
          type="password"
        />
      </DialogBody>
      <DialogFooter className="flex items-end gap-2">
        <Button color="blue-gray" onClick={handleOpen}>
          {t("cancel")}
        </Button>
        <Button color="red" onClick={handleUpdatePassword}>
          {t("submit")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdatePasswordModal;
