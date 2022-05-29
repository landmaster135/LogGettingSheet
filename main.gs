function doGet(e) {
  // let output = ContentService.createTextOutput();
  // output.setMimeType(ContentService.MimeType.JSON); //Mime TypeをJSONに設定
  // output.setContent(JSON.stringify(result)); //JSONテキストをセットする
  // return output;
}

function doPost(e) {
  var passedContents = JSON.parse(e.postData.contents);
  batchUrl   = passedContents.batchUrl;
  methodName = passedContents.methodName;
  manageLog(batchUrl, methodName);
  return ContentService.createTextOutput("pass!");
}

function writeLog(batchUrl, methodName) {
  const sheetName     = "ログ取得シート";
  let   spreadsheet   = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet         = spreadsheet.getSheetByName(sheetName);
  const column_of_key = 1;
  // let   row           = 1;
  let row = Number(
    sheet.getRange(
      ROW_INDEX_TO_COUNT_AMOUNT_OF_RECORD
      , COLUMN_INDEX_TO_COUNT_AMOUNT_OF_RECORD
    ).getValue() + 2
  );
  // row = Number(sheet.getRange(ROW_INDEX_TO_COUNT_AMOUNT_OF_RECORD, column_of_key + 5).getValue() + 2);
  let date = new Date();

  // sheet.getRange(row, column_of_key).setValue(date); // 年月日時分秒を入力。
  // sheet.getRange(row, column_of_key + 1).setValue(date); // 1列目で入力。シート内の関数を利用。
  // sheet.getRange(row, column_of_key + 2).setValue(String(batchUrl));
  // sheet.getRange(row, column_of_key + 3).setValue(String(methodName));

  sheet.getRange(row, COLUMN_INDEX_OF_EXECUTING_DATE).setValue(date); // 年月日時分秒を入力。
  sheet.getRange(row, COLUMN_INDEX_OF_EXECUTING_TIME).setValue(date); // 1列目で入力。シート内の関数を利用。
  sheet.getRange(row, COLUMN_INDEX_OF_EXECUTING_SCRIPT_URL).setValue(String(batchUrl));
  sheet.getRange(row, COLUMN_INDEX_OF_EXECUTING_METHOD_NAME).setValue(String(methodName));
}

function clearLog() {
  const sheetName     = "ログ取得シート";
  let   spreadsheet   = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet         = spreadsheet.getSheetByName(sheetName);
  const column_of_key = 1;
  let row = Number(
    sheet.getRange(
      ROW_INDEX_TO_COUNT_AMOUNT_OF_RECORD
      , column_of_key + 5
    ).getValue()
  );
  let targetRecordAmount = 600;
  let dataList      = [];

  if(row > targetRecordAmount){
    dataList = sheet.getRange(ROW_INDEX_TO_START_COLLECTING_RECORDS + targetRecordAmount
                                , 1
                                , row - targetRecordAmount
                                , COLUMN_LAST_INDEX_TO_COUNT_AMOUNT_OF_RECORD
                              ).getValues();
    sheet.getRange(ROW_INDEX_TO_START_COLLECTING_RECORDS
                    , 1
                    , targetRecordAmount
                    , COLUMN_LAST_INDEX_TO_COUNT_AMOUNT_OF_RECORD
                  ).clearContent();
    sheet.getRange(ROW_INDEX_TO_START_COLLECTING_RECORDS
                    , 1
                    , row - targetRecordAmount
                    , COLUMN_LAST_INDEX_TO_COUNT_AMOUNT_OF_RECORD
                  ).setValues(dataList);
    sheet.getRange(ROW_INDEX_TO_START_COLLECTING_RECORDS + targetRecordAmount, 1, row - targetRecordAmount, COLUMN_LAST_INDEX_TO_COUNT_AMOUNT_OF_RECORD).clearContent();
  }
}

function manageLog(batchUrl, methodName) {
  clearLog();
  writeLog(batchUrl, methodName);
}

function test(){
  writeLog("batchUrl", "methodName");
}

