const progressOptions = [{ shortName: 'wip', longName: 'Work In Progress' }, { shortName: 'd', longName: 'Done' }, { shortName: 'b', longName: 'Broken' }];
// Global store (Add any fields you need here)
let store = {
    orders: [],
    pendingOrders: [],
    declinedOrders: []
};
function areYouSure() {
    var x = document.getElementById("confirmation-dialog");
    x.style.display = "block";
}
function addPendingOrder() {
    const id = store.pendingOrders.length + 1;
    const clientName = document.getElementById("aligned-name").value;
    const fileSize = 'dummy value';
	const dateObj = new Date();
	const date = (dateObj.getMonth() + 1)+ "/" + (dateObj.getDate())+"/" + (dateObj.getFullYear());
    const color = document.getElementById('color').value;
    const designer = document.getElementById('designer').value;
    const printer = document.getElementById('printer').value;
    const description = document.getElementById('description').value;
    addPendingOrderInternal(id, clientName, printer, designer, description, fileSize, date, color);
}

//row5 : sequcence destory the table, define the boolean value, add date, 
//       selection if statment tells everything where to go based on the boolean
//       itreation make this happen for EACH pending order
//          TLDR remove values, add values, tell values where to go, repeat 
function reviewPendingOrders() {
    const newPendingOrders = [];
    const newOrders = [];
    const newDeniedOrders = [];
    while (store.pendingOrders.length != 0) {
        const pendingOrder = store.pendingOrders.pop();
        const approved = document.getElementById(createRadioId(String(pendingOrder[0]), 'approved')).checked;
        const denied = document.getElementById(createRadioId(String(pendingOrder[0]), 'denied')).checked;
        const dateObj = new Date();
        const date = (dateObj.getMonth() + 1)+ "/" + (dateObj.getDate())+"/" + (dateObj.getFullYear());
        if (approved) {
            pendingOrder[2] = date;
            newOrders.push(pendingOrder);
        } else if (denied) {
            pendingOrder[2] = date;
            newDeniedOrders.push(pendingOrder);
        } else {
            newPendingOrders.push(pendingOrder);
        }
    }

    //row 2 data abstraction:data abstraction: values are stored here to make a newOrder, Denied order, or a pending order 
    clearTable('pending-table');
    newPendingOrders.forEach(o => {
        addPendingOrderInternal(o[0], o[1], o[5], o[6], o[7], o[3], o[2], o[4]);
    });
    newOrders.forEach(o => {
        addOrderInternal(o[0], o[1], o[5], o[6], o[7], o[2], o[4]);
    });
    newDeniedOrders.forEach(o => {
        addDeclinedOrderInternal(o[0], o[1], o[5], o[6], o[7], o[2], o[4]);
    });
    // row5
}

//row 2  
// tldr inputs to the approved 

// row 3 manganing complexity: This allow values to be store in javascript, allow easier transfer of values from one list to another
//TLDR: Javascript makes it easier but not having to use every table row id in HTML
function reviewApprovedOrders() {
    const newOrders = [];
    const newFinishedOrders = [];
    while (store.orders.length != 0) {
        const order = store.orders.pop();
        const status = document.getElementById(createSelectId(String(order[0]), 'status')).value;
        switch(status) {
            case 'wip':
                newOrders.push(order);
                break;
            case 'b':
                var action = 'Broken';
                order.push(action);
                newFinishedOrders.push(order);
                break;
            case 'd':
                action = 'Approved';
                order.push(action);
                newFinishedOrders.push(order);
                break;
            default:
                console.log('something is wrong');
        }
    }
      //row 3 
    clearTable('accepted-table');
    newOrders.forEach(o => {
        addOrderInternal(o[0], o[1], o[4], o[5], o[6], o[2], o[3]);
    });
    newFinishedOrders.forEach(o => {
        addFinishedOrderInternal(o[0], o[1], o[4], o[5], o[6], o[2], o[3], o[7], 'N/A');
    });
}

function reviewDeclinedOrders() {
    const newDeclinedOrders = [];
    const newFinishedOrders = [];
    while (store.declinedOrders.length != 0) {
        const order = store.declinedOrders.pop();
        const reason = document.getElementById(createInputId(String(order[0]), 'decline')).value;
        if(reason == ''){
            newDeclinedOrders.push(order);
        } else {
            order.push(reason)
            newFinishedOrders.push(order);
        }
    }
    clearTable('declined-table');
    newDeclinedOrders.forEach(o => {
        addDeclinedOrderInternal(o[0], o[1], o[3], o[4], o[6], o[2], o[5]);
    });
    newFinishedOrders.forEach(o => {
        addFinishedOrderInternal(o[0], o[1], o[3], o[4], o[6], o[2], o[5], 'Declined', o[7]);
    });
}

function clearTable(label) {
    const table = document.getElementById(label);
    const newBody = document.createElement('tbody');
    newBody.setAttribute('id', label + '-body');
    table.replaceChild(newBody, table.lastElementChild);
}

//internal.js

//row 4 producal absraction: When paramaters are added it add row on the list and corrspond with the paramaters
//TLDR add rows with the given paramaters 
function addPendingOrderInternal(orderId, clientId, printerId, designerId, description, fileSize, date, color) {

    if (orderId != null && clientId != null && printerId != null && designerId != null) {

//null check client id and description to finsh 6
        rowInput = [orderId, clientId, date, fileSize, color, printerId, designerId, description];
        store.pendingOrders.push(rowInput);
    
        var row = document.createElement('tr');
        var tableBody = document.getElementById('pending-table-body');
        for (let i = 0; i < rowInput.length; i++) {
            cellInput = rowInput[i];
            var cell = document.createElement('td');
            if (i == 7) {
                var child = document.createElement('textarea');
                child.setAttribute('placeholder', cellInput);
                child.setAttribute('readonly', '');
                cell.appendChild(child);
            } else {
                cell.appendChild(document.createTextNode(cellInput));     
            }
            row.appendChild(cell);
    
        }
        row.append(createRadio(String(orderId), 'approved'));
        row.append(createRadio(String(orderId), 'denied'));
        tableBody.appendChild(row);
        //saveLocalStorage();

    } else {
        console.log('One of the following required fields is null: orderId, clientId, printerId, designerId');
    }

}

function addOrderInternal(orderId, clientId, printerId, designerId, description, date, color) {

    if (orderId != null && clientId != null && printerId != null && designerId != null) {

        rowInput = [orderId, clientId, date, color, printerId, designerId, description];
        store.orders.push(rowInput);

        var row = document.createElement('tr');
        var tableBody = document.getElementById('accepted-table-body');
        for (let i = 0; i < rowInput.length; i++) {
            cellInput = rowInput[i];
            var cell = document.createElement('td');
            if (i == 6) {
                var child = document.createElement('textarea');
                child.setAttribute('placeholder', cellInput);
                child.setAttribute('readonly', '');
                cell.appendChild(child);
            } else {    
                cell.appendChild(document.createTextNode(cellInput));
            }
            row.appendChild(cell);
        }
        const selector = createSelector(String(orderId), 'status');
        row.append(selector);
        tableBody.appendChild(row);
        //saveLocalStorage();


    } else {
        console.log('One of the following required fields is null: orderId, clientId, printerId, designerId');
    }

}

function addDeclinedOrderInternal(orderId, clientId, printerId, designerId, description, date, color) {

    if (orderId != null && clientId != null && printerId != null && designerId != null) {

        rowInput = [orderId, clientId, date, printerId, designerId, color, description];
        store.declinedOrders.push(rowInput);

        var row = document.createElement('tr');
        var tableBody = document.getElementById('declined-table-body');
        for (let i = 0; i < rowInput.length; i++) {
            cellInput = rowInput[i];
            var cell = document.createElement('td');
            if (i== 6){
                var child = document.createElement('textarea');
                child.setAttribute('placeholder', cellInput);
                child.setAttribute('readonly', '');
                cell.appendChild(child);

            } else {
                cell.appendChild(document.createTextNode(cellInput)); 
            }
            row.appendChild(cell);
            if (i == 2) {
                var reasonCell = document.createElement('td');
                var child = document.createElement('input');
                child.setAttribute('placeholder', 'Type Reason Here');
                child.setAttribute('id', createInputId(orderId, 'decline'));
                reasonCell.appendChild(child);
                row.appendChild(reasonCell);
            } 
        }
        tableBody.appendChild(row);
        //saveLocalStorage();

    } else {
        console.log('One of the following required fields is null: orderId, clientId, printerId, designerId');
    }
}

function addFinishedOrderInternal(orderId, clientId, printerId, designerId, description, date, color, action, reason) {

    if (orderId != null && clientId != null && printerId != null && designerId != null) {

        rowInput = [orderId, clientId, date, action, reason, printerId, designerId, color, description];

        var row = document.createElement('tr');
        var tableBody = document.getElementById('history-table-body');
        for (let i = 0; i < rowInput.length; i++) {
            cellInput = rowInput[i];
            var cell = document.createElement('td');
            if (i==4 || i==8){
                var child = document.createElement('textarea');
                child.setAttribute('placeholder', cellInput);
                child.setAttribute('readonly', '');
                cell.appendChild(child);

            } else {
                cell.appendChild(document.createTextNode(cellInput)); 
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
        //saveLocalStorage();

    } else {
        console.log('One of the following required fields is null: orderId, clientId, printerId, designerId');
    }
}

function createRadio(id, label) {
    var radio = document.createElement('td');
    var radioInput = document.createElement('input');
    radioInput.setAttribute('id', createRadioId(id, label))
    const radioInputName = 'optionsRadios' + id;
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', radioInputName);
    radio.appendChild(radioInput);

    return radio;
}

function createRadioId(id, label) {
    return label + '-radio-' + id;
}

function createSelector(id, label) {
    var selector = document.createElement('td');
    var select = document.createElement('select');
    select.setAttribute('name', label);
    select.setAttribute('id', createSelectId(id, label));
    progressOptions.forEach(opt => {
        select.appendChild(createOption(id, opt['longName'], opt['shortName']));
    });
    selector.appendChild(select);
    return selector;
}

function createOption(id, progressOption, progressOptionCode) {
    var option = document.createElement('option');
    option.setAttribute('value', progressOptionCode);
    option.textContent = progressOption;
    return option;
}

function createSelectId(id, label) {
    return label + '-select-' + id;
}

function createInputId(id, label) {
    return label + '-input-' + id;
}