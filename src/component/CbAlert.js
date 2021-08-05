import Swal from 'sweetalert2';

const Toast = Swal.mixin({
	toast: true,
	position: 'bottom',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
	  toast.addEventListener('mouseenter', Swal.stopTimer)
	  toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
});

export const cbToast = (title, type) => { //type: success, error, warning, info, question
  return Toast.fire({
    icon: type,
    title: title
  });
}