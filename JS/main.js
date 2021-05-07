//Data definition
var myTableData =
  [{
    "id": "1",
    "name": "Tiger Nixon",
    "position": "System Architect",
    "salary": "#",
    "start_date": "2011/04/25",
    "office": "Edinburgh",
    "extn": "5421"
  }, {
    "id": "2",
    "name": "Garrett Winters",
    "position": "Accountant",
    "salary": "$170,750",
    "start_date": "2011/07/25",
    "office": "Tokyo",
    "extn": "8422"
  }, {
    "id": "3",
    "name": "Ashton Cox",
    "position": "Junior Technical Author",
    "salary": "$86,000",
    "start_date": "2009/01/12",
    "office": "San Francisco",
    "extn": "1562"
  }, {
    "id": "4",
    "name": "Cedric Kelly",
    "position": "Senior Javascript Developer",
    "salary": "$433,060",
    "start_date": "2012/03/29",
    "office": "Edinburgh",
    "extn": "6224"
  }, {
    "id": "5",
    "name": "Airi Satou",
    "position": "Accountant",
    "salary": "$162,700",
    "start_date": "2008/11/28",
    "office": "Tokyo",
    "extn": "5407"
  }, {
    "id": "6",
    "name": "Brielle Williamson",
    "position": "Integration Specialist",
    "salary": "$372,000",
    "start_date": "2012/12/02",
    "office": "New York",
    "extn": "4804"
  }, {
    "id": "7",
    "name": "Herrod Chandler",
    "position": "Sales Assistant",
    "salary": "$137,500",
    "start_date": "2012/08/06",
    "office": "San Francisco",
    "extn": "9608"
  }
];
//Global variable for future use
var datepickers = [{
    id: 'startdate',
    coid: 'enddate',
    value: null,
    limiter: 'minDate'
  }, {
    id: 'enddate',
    coid: 'startdate',
    value: null,
    limiter: 'maxDate'
  }
];
//Translate 'yy/mm/dd' string to UTC date
const yymmddUTC = str => new Date(...str.split('/').map((value,index) => index == 1 ? value-- : value));
//DataTables object definition
var myDataTable = $('#staff').DataTable({
    sDom: 't',
    data: myTableData,
    columns: [{
        title: 'Name',
        data: 'name'
      }, {
        title: 'Position',
        data: 'position'
      }, {
        title: 'Office',
        data: 'office'
      }, {
        title: 'Hire date',
        data: 'start_date'
      }, {
        title: 'Salary',
        data: 'salary'
      }
    ]
  });
//Limit datepicker options to those valid for current dataset
var dates = myDataTable.column(3).data().unique().sort();
var minDate = dates[0];
var maxDate = dates[dates.length-1];
//datepicker objects definition
$('.datepicker').datepicker({
  dateFormat: 'yy/mm/dd',
  changeMonth: true,
  defaultDate: minDate,
  changeYear: true,
  yearRange: minDate.substr(0,4)+':'+maxDate.substr(0,4),
  onSelect: function (selectedDate) {
    let datepicker = datepickers.find(entry => entry.id == $(this).attr('id'));
    $(`#${datepicker.coid}`).datepicker('option', datepicker.limiter, selectedDate);
    datepicker.value = yymmddUTC(selectedDate);
    myDataTable.draw();
  }
}).on('change', function(){
  datepickers[datepickers.findIndex(item => item.id == $(this).attr('id'))].value = yymmddUTC($(this).val());
  myDataTable.draw();
});
//External search function
$.fn.DataTable.ext.search.push((settings, row) => {
  let rowDate = yymmddUTC(row[3]);
  return (rowDate >= datepickers[0].value || datepickers[0].value == null) && (rowDate <= datepickers[1].value || datepickers[1].value == null);
});
