import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { ToastProgrammatic as Toast } from 'buefy'
import { DialogProgrammatic as Dialog } from 'buefy'

const BuefyHelper = {
    showSnackBar(message, actionText, type, callback) {
        Snackbar.open({
            message: message,
            type: type,
            position: 'is-top',
            actionText: actionText,
            indefinite: true,
            onAction: callback
        })
    },
    showToastMessage(message, type, duration = 5000) {
        Toast.open({
            duration: duration,
            message: message,
            type: type,
        })
    },
    showAlert(title, message,confirmText='OK') {
        Dialog.alert({
            title: title,
            message: message,
            confirmText: confirmText,
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa',
            ariaRole: 'alertdialog',
            ariaModal: true
        });
    },
    showConfirmAlert(title, message, confirmText) {
        return new Promise((resolve) => {
            Dialog.confirm({
                title: title,
                message: message,
                confirmText: confirmText,
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    resolve(true);
                },
                onCancel: () => {
                    resolve(false);
                }
            });
        });
    },
}

export { BuefyHelper }