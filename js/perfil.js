document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del perfil
    const profileImg = document.getElementById("profile-img");
    const profileName = document.getElementById("profile-name");
    const profileDesc = document.getElementById("profile-desc");
    const profileEmail = document.getElementById("profile-email");
    const profilePhone = document.getElementById("profile-phone");

    // Obtener elementos del formulario
    const nameInput = document.getElementById("name");
    const descInput = document.getElementById("desc");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    // Crear un input oculto para la imagen
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.style.display = "none";

    // Agregar el input al body
    document.body.appendChild(imageInput);

    // Evento para cambiar la imagen de perfil
    profileImg.addEventListener("click", () => {
        imageInput.click();
    });

    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Función para actualizar el perfil
    window.updateProfile = function () {
        const newName = nameInput.value.trim();
        const newDesc = descInput.value.trim();
        const newEmail = emailInput.value.trim();
        const newPhone = phoneInput.value.trim();

        if (newName) profileName.textContent = newName;
        if (newDesc) profileDesc.textContent = newDesc;
        if (newEmail) profileEmail.textContent = newEmail;
        if (newPhone) profilePhone.textContent = newPhone;

        alert("Perfil actualizado con éxito");
    };
});