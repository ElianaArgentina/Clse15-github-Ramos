try {
    var productsOnFrom = new Array();
    var change = false;
    var lastComment = "";
    var onEnglish = window.location.pathname.toLowerCase().includes("/en/");
    var year = document.querySelectorAll(".year");
    var dt = new Date(); 
    year[0].textContent = dt.getFullYear();
    var buttons = document.querySelectorAll(".handleForm");
    buttons.forEach(element => {
        element.addEventListener("click",function(e){
            toggleProduct({
                nameEs: e.target.getAttribute("nameEs"),
                nameEn: e.target.getAttribute("nameEn")
            });
        },false); 
    });
    resolveProductsOnFrom(false);
    var consultForm = document.getElementById('formContact');
    consultForm.addEventListener("submit", function(event){
            var field1 = document.getElementById('validationCustom01');
            var field2 = document.getElementById('validationCustom02');
            var field3 = document.getElementById('validationCustomUsername');
            var field4 = document.getElementById('exampleFormControlTextarea1');
            var field5 = document.getElementById('validationCustom04');
            if (
                (field1.value == "")
                || (field2.value == "")
                || (field3.value == "")
                || (field4.value == "")
                || (field5.value == "")
            ) {
            } else {
                var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                    keyboard: false
                })
                myModal.show();
            }
    })
} catch(error) {
    console.error(error)
}

function toggleProduct(product)
{
    let exit = (productsOnFrom.filter(current => current.nameEn == product.nameEn)).length > 0;
    if (exit) {
        productsOnFrom = productsOnFrom.filter(current => current.nameEn != product.nameEn);
    } else {
        var showedModal = Cookies.get('showedModal');
        if (!showedModal){
            var myModal = new bootstrap.Modal(document.getElementById('exampleModalconsultar'), {
                keyboard: false
            })
            myModal.show();
            Cookies.set('showedModal', JSON.stringify(true), { expires: 1 });
        }
        productsOnFrom.push(product);
    }
    Cookies.set('productsOnForm', JSON.stringify(productsOnFrom));
    resolveProductsOnFrom(true);
}

function resolveProductsOnFrom()
{
    var productsOnFromCookie = Cookies.get('productsOnForm');
    if (productsOnFromCookie)
        productsOnFrom = JSON.parse(productsOnFromCookie);
    buttons.forEach(element =>
    {
        let added = (productsOnFrom.filter(current => current.nameEn == element.getAttribute("nameEn"))).length > 0;
        if (added) {
            element.classList.add("bg-danger");
            element.classList.add("text-white");
            element.innerText = onEnglish ? "Added" : "Agregado";
        } else {
            element.classList.remove("bg-danger");
            element.classList.remove("text-white");
            element.innerText = onEnglish ? "Consult" : "Consultar";
        }
    });

    try
    {
        var consult = document.getElementById('exampleFormControlTextarea1');
        var names = productsOnFrom.map(current => onEnglish ? current.nameEn : current.nameEs);
        var title = onEnglish ? "I want to know the prices of:" : "Quiero saber los precios de:"
        consult.value = title;
        consult.value += "\n";
        consult.value += "\n";
        consult.value += "- ";
        consult.value += names.join("\n- ");
        consult.value += "\n";
        consult.value += "\n";
    } catch(error)
    {

    }
}