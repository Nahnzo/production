import Modal from "shared/ui/Modal/Modal";
import Loader from "shared/ui/Loader/Loader";
import { classNames } from "shared/lib/classNames/classNames";
import { Suspense } from "react";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal className={classNames("", {}, [className])} isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};

export default LoginModal;
