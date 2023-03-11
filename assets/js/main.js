const socketCli = io("wss://hordeparty.ddns.net/clients");

function entrarServidorXnes(idTab, idServer) {
    console.log('entra xnes', idTab, idServer);
    $('#aplay' + idTab).click();
    $('#iframeplay' + idTab).attr("src", "old/horde-client.html?room=" + idTab);
}

function entrarServidorSerial(idTab, idServer) {
    console.log('entra serial', idTab, idServer);
    $('#aplay' + idTab).click();
    $('#iframeplay' + idTab).attr("src", "serial-client.html?room=" + idTab);
}

function criaServidorXnes(idTab) {
    $('#iframe' + idTab).attr("src", "old/horde-server.html?room=" + idTab);
}

function criaServidorSerial(idTab) {
    $('#iframe' + idTab).attr("src", "serial-server.html?room=" + idTab);
}

$(function () {
    let tabTemplate = `<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>`

    let tabs = $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");

    let dialog = $("#dialog").dialog({
        minWidth: 400,
        autoOpen: false,
        modal: true,
        buttons: {
            "Criar/Entrar": function () {
                let room = $('#tab_title').val()
                if (room) {
                    addTab(room);
                } else {
                    socketCli.emit('createRoom');
                }
                $(this).dialog("close");
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });

    let dialog_abandona = $("#dialog_abandona").dialog({
        minWidth: 200,
        autoOpen: false,
        modal: true,
        buttons: {
            "Sim": function () {
                let panelId = dialog_abandona.dialog().li_tab_close.remove().attr("aria-controls");
                $("#" + panelId).remove();
                dialog_abandona.dialog().li_tab_close.remove();
                tabs.tabs("refresh");
                $(this).dialog("close");
            },
            "Nao": function () {
                $(this).dialog("close");
            }
        },
        li_tab_close: {}
    });

    // AddTab form: calls addTab function on submit and closes the dialog
    let form = dialog.find("form").on("submit", function (event) {
        // addTab();
        // dialog.dialog("close");
        event.preventDefault();
    });

    // Actual addTab function: adds new tab using the input from the form above
    function addTab(roomId) {
        let id = roomId,
            tab_nome_jogador = $('#tab_nome_jogador').val(),
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, id));

        // tabs.find(".ui-tabs-nav").append(li);
        tabs.children(".ui-tabs-nav").append(li);
        let divHtml = `<div id='${id}'>
<ul>
<li><a href="#servidores${id}">servidores</a></li> 
<li><a href="#play${id}" id="aplay${id}">play</a></li>
</ul>
<div id="servidores${id}">
Jogador: <strong>${tab_nome_jogador}</strong>, sala: <strong>${id}</strong><br/><br/>
<button onclick="entrarServidorXnes('${id}');">Entrar Xnes</button>
<button onclick="entrarServidorSerial('${id}');">Entrar Serial</button><br/><br/>
<hr>
<button onclick="criaServidorXnes('${id}')">Novo Xnes</button>
<button onclick="criaServidorSerial('${id}')">Novo Serial</button><br/>
<iframe id="iframe${id}" style="resize: both;"></iframe>

</div>
<div id="play${id}">
<iframe id="iframeplay${id}" style="resize: both;"></iframe>
</div>
</div>`;
        let jDiv = $(divHtml).tabs();
        jDiv.find('button').button();
        tabs.append(jDiv);
        tabs.tabs("refresh");
        li.children('a').click();
    }

    // AddTab button: just opens the dialog
    $("#add_tab")
        .button()
        .on("click", function () {
            dialog.dialog("open");
        });

    // Close icon: removing the tab on click
    tabs.on("click", "span.ui-icon-close", function () {
        let li = $(this).closest("li");
        $('#label_abandona').text(li.attr("aria-controls"))
        dialog_abandona.li_tab_close = li;
        dialog_abandona.dialog("open");
        tabs.tabs("refresh");
    });

    socketCli.on('createRoom', room => {
        addTab(room);
    });

});