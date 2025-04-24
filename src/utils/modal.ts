import Swal from 'sweetalert2'

export const showModal= ({title, text, type}:{title:string, text:string, type: 'success' | 'warning' | 'error'}) =>{
    return Swal.fire({
        title,
        text,
        icon: type
      });
}