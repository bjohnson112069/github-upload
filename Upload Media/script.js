
function loadContent() {
    const links = document.querySelectorAll('a');
    const browse = document.querySelector('#browse');
    const upload = document.querySelector('#upload-files');
    const drag = document.querySelector('.drag-and-drop');
    const add = document.querySelector('#add-tag');
    const form = document.querySelector('form');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function displayImagePreview(files) {
        const preview = document.querySelector('.img-preview > img');

        if (files.length > 1) {
            alert('Only one file may be selected');
            return;
        }
        // iterate through the object (Filelist)
        for (let file in files) {

            // verify the property exists
            if (files.hasOwnProperty(file)) {
                const fileObj = files[file];

                // input is restricted to 'image/*' types but verify ...
                if (fileObj.type.includes('image')) {
                    // update the image source
                    preview.src = URL.createObjectURL(fileObj);

                    // ddisplay the upload window
                    upload.classList.add('visible');
                } else alert('Invalid file format')
            }
        }
    }

    function handleFileSelection() {
        displayImagePreview(this.files);
    }

    function handleDragEvent(e) {
        if (e.type !== 'dragover' && e.type !== 'dragleave') return

        e.preventDefault(); // important for 'drag' eventListener
        
        e.type === 'dragover' ? 
            drag.classList.add('highlight') : 
            drag.classList.remove('highlight');
    }

    function handleDropEvent(e) {
        e.preventDefault();

        displayImagePreview(e.dataTransfer.files);
    }

    function handleAddTagEvent(e) {
        e.preventDefault();

        const group = this.closest('.input-group');
        const input = group.querySelector(`input[type="text"]`);
        const list = document.querySelector('.tag-list');
        const li = document.createElement('li');

        if (input.value === '') return;

        // update the innerHTML of the <li> element and append to the end of the list
        li.innerHTML = `<li class="tag-item">${input.value}</li>`;
        list.appendChild(li);

        // clear the input field
        input.value = '';

    }

    function handleFormSubmission(e) {
        e.preventDefault();

        const confirmation = document.querySelector('#confirmation');
        const preview = document.querySelector('.img-preview > img');
        const list = document.querySelector('.tag-list');

        upload.classList.remove('visible');
        form.reset();
        preview.src = '';
        list.innerHTML = '';
        confirmation.classList.add('visible');
        setTimeout(() => {
            confirmation.classList.remove('visible');
        }, 3000);
    }

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    browse.addEventListener('change', handleFileSelection);
    drag.addEventListener('dragover', handleDragEvent);
    drag.addEventListener('dragleave', handleDragEvent);
    drag.addEventListener('drop', handleDropEvent);
    add.addEventListener('click', handleAddTagEvent);
    form.addEventListener('submit', handleFormSubmission);
}

document.addEventListener('DOMContentLoaded', loadContent);