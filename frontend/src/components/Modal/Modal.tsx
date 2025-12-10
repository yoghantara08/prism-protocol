import React, { Fragment, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalProps extends BaseModalProps {
  children?: ReactNode;
  title?: string;
  id?: string;
  className?: string;
  titleClassName?: string;
  xButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  titleClassName,
  xButton = true,
  id,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog id={id} as="div" className={"relative z-50"} onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames("bg-dark/10 fixed inset-0 backdrop-blur-xs")}
          />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
            >
              <DialogPanel
                onClick={(e) => e.stopPropagation()}
                className={classNames(
                  "mx-[15px] my-4 w-full transform overflow-hidden rounded-2xl px-5 transition-all",
                  "bg-background max-w-[345px] border md:max-w-[600px]",
                  className && className,
                )}
              >
                {title ? (
                  <div
                    className={classNames(
                      "-mx-5 flex h-[60px] items-center justify-between border-b px-5 md:h-[70px]",
                      titleClassName,
                    )}
                  >
                    <div className="flex items-center gap-x-1">
                      <span
                        className={classNames(
                          "text-lg font-semibold md:text-2xl",
                        )}
                      >
                        {title}
                      </span>
                    </div>

                    {xButton && (
                      <IoClose
                        className="text-secondary hover:text-primary h-6 w-6 cursor-pointer md:h-7 md:w-7"
                        onClick={onClose}
                      />
                    )}
                  </div>
                ) : (
                  <IoClose
                    className={classNames(
                      "text-secondary hover:text-primary absolute top-5 right-5 z-20 h-6 w-6 cursor-pointer",
                      "md:h-7 md:w-7",
                    )}
                    onClick={onClose}
                  />
                )}
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
