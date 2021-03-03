function main() {
  var tableLength = 150; // Количество элементов таблицы
  var maxLength   = 50;  // Количество не скрытых элементов
  table = createTable(tableLength);
  createPagination(table, tableLength, maxLength);
  sortTable(table, tableLength);
  filterTable(table, tableLength);
  return true;
}
main();


function createTable(tableLength) { // Создание таблицы
  var body  = document.getElementsByTagName('body')[0];
  var table = document.createElement('table');
  table.style.width = '100%';
  table.setAttribute('border', '1');
  body.appendChild(table);

  var thead = document.createElement('thead');
  var tr    = document.createElement('tr');
  table.appendChild(thead);
  thead.appendChild(tr);
  var thNames = ['Наименование', 'Описание', 'Цена'];
  var thClass = ['name', 'description', 'price'];
  for ( var i = 0; i < 3; i++ ) {
    var th     = document.createElement('th');
    var button = document.createElement('button');
    tr.appendChild(th);
    th.appendChild(button);
    button.appendChild(document.createTextNode(thNames[i]));
    button.setAttribute('class', thClass[i]);
  }

  var tbody = document.createElement('tbody');
  table.appendChild(tbody);
  var names        = Array(tableLength);
  var descriptions = Array(tableLength);
  var prices       = Array(tableLength);
  names[0] = 'Я Хлеб';
  prices[0] = '55 руб';
  descriptions[0] = 'Всему голова';
  for ( var i = 1; i < tableLength; i++) {
    names[i]        = `Название ${i+1}`;
    descriptions[i] = `Описание ${i+1}`;
    prices[i]       = `${(i+1)*10} руб.`;
  }
  for ( var i = 0; i < tableLength; i++ ) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    for ( var j = 0; j < 3; j++){
      var td1 = document.createElement('td');
      td1.appendChild(document.createTextNode(names[i]));
      var td2 = document.createElement('td');
      td2.appendChild(document.createTextNode(descriptions[i]));
      var td3 = document.createElement('td');
      td3.appendChild(document.createTextNode(prices[i]));
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
  }
  return table;
}


function createPagination(table, tableLength, maxLength) { // Пагинация
  var page          = 1;
  var pagination    = document.createElement('div');
  var buttonBack    = document.createElement('button');
  var buttonForward = document.createElement('button');
  buttonBack.appendChild(document.createTextNode('Назад'));
  buttonForward.appendChild(document.createTextNode('Вперед'));
  pagination.setAttribute('class', 'pagination');
  pagination.style.display = 'inline-block';
  table.before(pagination);
  pagination.appendChild(buttonBack);
  pagination.appendChild(buttonForward);

  var tableLength = tableLength;
  for ( var i = tableLength-1; i > maxLength-1; i-- ) {
    table.childNodes[1].childNodes[i].style.display = "none";
  }

  buttonForward.onclick = function() {
    if ( table.childNodes[1].childNodes[page * maxLength] ) {
      for ( var i = 0; i < maxLength; i++ ) {
        if ( table.childNodes[1].childNodes[i + page * maxLength] ) {
          table.childNodes[1].childNodes[i + page * maxLength].style.display = "";
        }
      }
      for ( var i = 0; i < maxLength; i++ ) {
        table.childNodes[1].childNodes[page * maxLength - i - 1].style.display = "none";
      }
      page += 1;
    }
  }

  buttonBack.onclick = function() {
    if ( table.childNodes[1].childNodes[(page - 2) * maxLength] ) {
      for ( var i = 0; i < maxLength; i++ ) {
        if ( table.childNodes[1].childNodes[i + (page - 2) * maxLength] ) {
          table.childNodes[1].childNodes[i + (page - 2) * maxLength].style.display = "";
        }
      }
      for ( var i = 0; i < maxLength; i++ ) {
        if ( table.childNodes[1].childNodes[page * maxLength - i - 1] ) {
          table.childNodes[1].childNodes[page * maxLength - i - 1].style.display = "none";
        }
      }
      page -= 1;
    }
  }
}


function sortTable(table, tableLength) { // Сортировка по столбцам
  var name = table.getElementsByClassName('name')[0];
  var description = table.getElementsByClassName('description')[0];
  var price = table.getElementsByClassName('price')[0];
  var asc_desc = [0, 0, 0];
  var tableContent = Array(tableLength);
  for ( i = 0; i < tableLength; i++ ) {
    tableContent[i] = Array(3);
  }
  name.onclick = function() {
    for ( var i = 0; i < tableLength; i++ ) {
      tableContent[i][0] = table.childNodes[1].childNodes[i].childNodes[0].textContent;
      tableContent[i][1] = table.childNodes[1].childNodes[i].childNodes[1].textContent;
      tableContent[i][2] = table.childNodes[1].childNodes[i].childNodes[2].textContent;
    }
    naturalSort(tableContent);
    if ( asc_desc[0] % 2 == 0 ) {
      tableContent.reverse();
      for ( var i = 0; i < tableLength; i++ ) {
        table.childNodes[1].childNodes[i].childNodes[0].textContent = tableContent[i][0];
        table.childNodes[1].childNodes[i].childNodes[1].textContent = tableContent[i][1];
        table.childNodes[1].childNodes[i].childNodes[2].textContent = tableContent[i][2];
      }
    } else {
      for ( var i = 0; i < tableLength; i++ ) {
        table.childNodes[1].childNodes[i].childNodes[0].textContent = tableContent[i][0];
        table.childNodes[1].childNodes[i].childNodes[1].textContent = tableContent[i][1];
        table.childNodes[1].childNodes[i].childNodes[2].textContent = tableContent[i][2];
      }
    }
    asc_desc[0] += 1;
  }
  description.onclick = function() {
    for ( var i = 0; i < tableLength; i++ ) {
      tableContent[i][0] = table.childNodes[1].childNodes[i].childNodes[1].textContent;
      tableContent[i][1] = table.childNodes[1].childNodes[i].childNodes[0].textContent;
      tableContent[i][2] = table.childNodes[1].childNodes[i].childNodes[2].textContent;
    }
    naturalSort(tableContent);
    if ( asc_desc[1] % 2 == 0 ) {
      tableContent.reverse();
      for ( var i = 0; i < tableLength; i++ ) {
        table.childNodes[1].childNodes[i].childNodes[1].textContent = tableContent[i][0];
        table.childNodes[1].childNodes[i].childNodes[0].textContent = tableContent[i][1];
        table.childNodes[1].childNodes[i].childNodes[2].textContent = tableContent[i][2];
      }
    } else {
      for ( var i = 0; i < tableLength; i++ ) {
        table.childNodes[1].childNodes[i].childNodes[1].textContent = tableContent[i][0];
        table.childNodes[1].childNodes[i].childNodes[0].textContent = tableContent[i][1];
        table.childNodes[1].childNodes[i].childNodes[2].textContent = tableContent[i][2];
      }
    }
    asc_desc[1] += 1;
  }

  price.onclick = function() {
    for ( var i = 0; i < tableLength; i++ ) {
      tableContent[i][0] = table.childNodes[1].childNodes[i].childNodes[2].textContent;
      tableContent[i][1] = table.childNodes[1].childNodes[i].childNodes[0].textContent;
      tableContent[i][2] = table.childNodes[1].childNodes[i].childNodes[1].textContent;
    }
    naturalSort(tableContent);
    if ( asc_desc[2] % 2 == 0 ) {
      tableContent.reverse();
      for ( var i = 0; i < tableLength; i++ ) {
        table.childNodes[1].childNodes[i].childNodes[2].textContent = tableContent[i][0];
        table.childNodes[1].childNodes[i].childNodes[0].textContent = tableContent[i][1];
        table.childNodes[1].childNodes[i].childNodes[1].textContent = tableContent[i][2];
      }
    } else {
      for ( var i = 0; i < tableLength; i++ ) {
        table.childNodes[1].childNodes[i].childNodes[2].textContent = tableContent[i][0];
        table.childNodes[1].childNodes[i].childNodes[0].textContent = tableContent[i][1];
        table.childNodes[1].childNodes[i].childNodes[1].textContent = tableContent[i][2];
      }
    }
    asc_desc[2] += 1;
  }
}


function filterTable(table, tableLength) { // Фильтрация
  var form = document.createElement('input');
  form.style.display = 'inline-block';
  form.setAttribute('type', 'text');
  table.before(form);
  form.oninput = function() {
    for ( var i = 0; i < tableLength; i++ ) {
      if ( table.childNodes[1].childNodes[i].childNodes[0].textContent.toLowerCase().includes(form.value.toLowerCase()) ||
           table.childNodes[1].childNodes[i].childNodes[1].textContent.toLowerCase().includes(form.value.toLowerCase()) ||
           table.childNodes[1].childNodes[i].childNodes[2].textContent.toLowerCase().includes(form.value.toLowerCase()) ) {
        table.childNodes[1].childNodes[i].style.display = "";
      } else {
        table.childNodes[1].childNodes[i].style.display = "none";
      }
    }
  }
}


function naturalSort(arr) {
  var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  arr.sort(collator.compare);
  return arr;
}
