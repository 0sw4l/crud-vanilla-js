(function () {

    let nombres_list = [];

    let nombre = document.getElementById('nombre');
    let crear = document.getElementById('crear');
    let actualizar = document.getElementById('actualizar');
    let alert_warning = document.getElementById('alert-warning');
    let alert_error = document.getElementById('alert-error');
    let alert_info = document.getElementById('alert-info');
    let alert_success = document.getElementById('alert-success');
    let container = document.getElementById('nombres');
    let remove_item = document.getElementsByClassName('delete');
    let update_item = document.getElementsByClassName('update');
    let tabla = document.getElementById('tabla');
    let mensaje = document.getElementById('mensaje');
    let current_index = -1;
    let render_data = null;

    let remove_item_click = function() {
        let index = this.getAttribute('data-id');
        nombres_list.splice(index, 1);
        render();
    };

    let update_item_click =  function() {
        let index = this.getAttribute('data-id');
        let item = nombres_list[index];
        current_index = index;
        nombre.value = item;
        crear.classList.add('hidden');
        actualizar.classList.remove('hidden');
    };

    crear.onclick = function () {
        bindData();
    };

    actualizar.onclick = function () {
        bindData();
    };

    function bindData() {
        hideAlertInfo();
        if (getNombre().length > 0) {
            hideAllAlerts();
            if (nombres_list.indexOf(getNombre()) === -1) {
                if (current_index !== -1) {
                    crear.classList.add('hidden');
                    actualizar.classList.remove('hidden');
                    nombres_list[current_index] = getNombre();
                    current_index = -1;
                    crear.classList.remove('hidden');
                    actualizar.classList.add('hidden');
                }  else {
                    nombres_list.push(getNombre());
                }
                showAlertSuccess();
                render();
            } else {
                showAlertError();
            }
        } else {
            showAlertWarning();
        }

        setTimeout(function () {
            showAlertInfo();
            hideAllAlerts();
        }, 3000);
    }

    function hideAllAlerts() {
        hideAlertError();
        hideAlertWarning();
        hideAlertSuccess();
    }

    function showAlertError() {
        alert_error.classList.remove('hidden');
    }

    function hideAlertError() {
        alert_error.classList.add('hidden');
    }

    function showAlertWarning() {
        alert_warning.classList.remove('hidden');
    }

    function hideAlertWarning() {
        alert_warning.classList.add('hidden');
    }

    function showAlertSuccess() {
        clearInput();
        alert_success.classList.remove('hidden');
    }

    function hideAlertSuccess() {
        alert_success.classList.add('hidden');
    }

    function showAlertInfo() {
        alert_info.classList.remove('hidden');
    }

    function hideAlertInfo() {
        alert_info.classList.add('hidden');
    }

    function getNombre() {
        return nombre.value;
    }

    function HTML(value, index, array) {
        render_data += "<tr id='" + index + "'>" +
            "                            <td class=\"text-left\">"+value+
            "                            </td>" +
            "                            <td align=\"center\">" +
            "                                <a class=\"btn btn-xs btn-info update\" data-id='" + index + "'>" +
            "                                    <i class=\"fa fa-pencil\"></i>\n" +
            "                                </a>" +
            "                                <a class=\"btn btn-xs btn-danger delete\" data-id='" + index + "'>" +
            "                                    <i class=\"fa fa-trash\"></i>\n" +
            "                                </a>" +
            "                            </td>" +
            "                        </tr>";
    }

    function render() {
        if (nombres_list.length > 0) {
            tabla.classList.remove('hidden');
            mensaje.classList.add('hidden');
            render_data = "";
            nombres_list.forEach(HTML);
            container.innerHTML = render_data;
            setEventListenerForItems();
        } else {
            tabla.classList.add('hidden');
            mensaje.classList.remove('hidden');
        }

    }

    function clearInput() {
        nombre.value = "";
    }

    function setEventListenerForItems() {
        let element;
        for (element = 0; element < remove_item.length; element++) {
            remove_item[element].addEventListener('click', remove_item_click, false);
        }
        for (element = 0; element < update_item.length; element++) {
            update_item[element].addEventListener('click', update_item_click, false);
        }
    }

})();