// VALIDACIONES REGISTRO.



//#region registro
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Obtener los valores de los campos
            const nombre = document.querySelectorAll('.input')[0].value.trim();
            const email = document.querySelectorAll('.input')[1].value.trim();
            const rut = document.querySelectorAll('.input')[2].value.trim();
            const password = document.querySelectorAll('.input')[3].value;
            const confirmPassword = document.querySelectorAll('.input')[4].value;
            
            // Validaciones
            if (!validarNombre(nombre)) {
                mostrarError('El nombre debe tener al menos 2 caracteres');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarError('Por favor ingresa un email válido');
                return;
            }
            
            if (!validarRut(rut)) {
                mostrarError('Por favor ingresa un RUT válido (ej: 12345678-9)');
                return;
            }
            
            if (!validarPassword(password)) {
                mostrarError('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            
            if (password !== confirmPassword) {
                mostrarError('Las contraseñas no coinciden');
                return;
            }
            
            // Si todas las validaciones pasan
            mostrarSuccess();
        });
    }
});

// Función para validar nombre
function validarNombre(nombre) {
    return nombre.length >= 2;
}

// Función para validar email
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar RUT segun validarutchile.cl
function validarRut(rut) {
    // Limpiar el RUT 
    const rutLimpio = rut.replace(/\./g, '').replace(/\s/g, '').toLowerCase();
    
    // Verificar formato
    if (!rutLimpio.includes('-')) {
        return false;
    }
    
    // Separar el dv
    const partesRut = rutLimpio.split('-');
    const numeroRut = partesRut[0];
    const dvIngresado = partesRut[1];
    
    // Validaciones básicas
    if (numeroRut.length < 7 || numeroRut.length > 8 || !/^\d+$/.test(numeroRut) || !/^[0-9k]$/.test(dvIngresado)) {
        return false;
    }
    
   
    var M = 0, S = 1, T = parseInt(numeroRut);
    while (T > 0) {  
        var digit = T % 10;  
        S = (S + digit * (9 - M % 6)) % 11;
        M++;
        T = Math.floor(T / 10);  
    }
    const dvCalculado = S ? S - 1 : 'k';
    
    // Comparar con el ingresado
    return dvCalculado.toString() === dvIngresado;
}

// Función para validar contraseña
function validarPassword(password) {
    return password.length >= 6;
}

// Función para mostrar errores
function mostrarError(mensaje) {
    // Remover mensaje anterior si existe
    const mensajeAnterior = document.querySelector('.mensaje');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }
    
    // Crear nuevo mensaje de error
    const formBox = document.querySelector('.form-box');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje error';
    mensajeDiv.textContent = mensaje;
    
    // Insertar antes del formulario
    formBox.insertBefore(mensajeDiv, document.querySelector('.form'));
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        if (mensajeDiv) {
            mensajeDiv.remove();
        }
    }, 5000);
}

// Función para Success
function mostrarSuccess() {
    // Remover mensaje anterior si existe
    const mensajeAnterior = document.querySelector('.mensaje');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }
    
    // crear Success
    const formBox = document.querySelector('.form-box');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje success';
    mensajeDiv.textContent = '¡Registro exitoso! Bienvenido a Fusion Market';
    
    // Insertar antes del formulario
    formBox.insertBefore(mensajeDiv, document.querySelector('.form'));
    
    // Limpiar formulario
    document.querySelector('.form').reset();
    
    // redirigir después de 3 segundos
    setTimeout(() => {
        
    }, 3000);
}
//#endregion