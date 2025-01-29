const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
export const appendAlert = (message, type) => {
    
    const elementoAEliminar = document.getElementById("mialert");
    if(elementoAEliminar)elementoAEliminar.remove();
    
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div id="mialert" class="alert alert-${type} alert-dismissible mt-5" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}
// appendAlert('Nice, you triggered this alert message!', 'warning')
