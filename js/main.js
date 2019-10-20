var code_1 = [["import", "os"], ["import", "flask"], ["import", "requests"], ["import", "subprocess"], ["app", "=", "Flask()"], ["if", "os.system('pwd'):"], ["print('dir')"]];
var code_2 = [['from', 'sqlalchemy.orm.attributes', 'import', 'flag_modified'], ['import', 'datetime'], ['from', 'json', 'import', 'loads'], ['from', '..compile_c.main', 'import', 'validate_json,', 'mypercentile,', 'mybirthdays,', 'recommit_data'], ['from', 'flask', 'import', 'jsonify,', 'request,', 'abort'], ['from', '.', 'import', 'main'], ['from', '..', 'import', 'db'], ['from', '..models', 'import', 'Person,', 'Birthday,', 'Percentile,', 'Bool'], ['@main.route("/imports",', 'methods=["POST"])'], ['def', 'parse():'], ['try:'], ['json_body', '=', 'request.json["citizens"]'], ['if', 'validate_json(json_body):'], ['abort(400)'], ['persons', '=', 'Person(value={"citizens":json_body})'], ['birthdays', '=', 'Birthday(value=mybirthdays(json_body))'], ['percentiles', '=', 'Percentile(value=mypercentile(json_body,', 'list(datetime.datetime.now().timetuple())[0:3]),', 'date=datetime.datetime.now())'], ['booleans', '=', 'Bool(birthday_bool=False,', 'percentile_bool=False)'], ['db.session.add(percentiles)'], ['db.session.add(birthdays)'], ['db.session.add(persons)'], ['db.session.add(booleans)'], ['db.session.commit()'], ['except:'], ['abort(400)'], ['return', 'jsonify({"data":{"import_id":persons.id}}),', '201']];
var code = [['from', 'flask', 'import', 'Flask'], ['import', 'requests', 'as', 'r'], ['import', 'subprocess', 'as', 'sb'], ['import', 'socket'], ['import', 're'], ['import', 'os'], ['import', 'urllib'], ['import', 'http'], ['from', '.app', 'import', 'MainQuery,', 'db,', 'app'], ['validate_mobile', '=', 're.compile("(\\+7|8)(-\\d{2,3}){4}")'], ['example', '=', '"+79257863492"'], ['result', '=', 'validate_mobile.fullmatch("example")'], ['app', '=', 'Flask(__name__)'], ['print("app', 'is', 'started")'], ['@app.route("/")'], ['def', 'hello():'], ['', '', '', '', 'return', '"Hello', 'World"'], ['app.run()']]



var options = {
  focus: false,
  timer_val: false,
  valid: "",
  correct: 0,
  no_correct: 0,
  c: 0,
};


var enter = {
  string_index: 0,
  word_index: 0,
  char_index: 0,
  next: null,
};

var metrics = {
  time: 60,
  words: 0,
  letters: 0,
  mistakes: 0,
};

var ch_metrics = function(attr, val){
  metrics[attr] = val;
  $(route(attr)).text(metrics[attr].toString());
};

var update_mistakes = function(){
  $(route("mistakes")).text(~~(options.correct / (options.correct + options.no_correct) * 100));
}

var route = function(name){
  return keys[name];
};

var keys = {
  "time" : ".time",
  "words" : ".words",
  "letters" : ".symbols",
  "mistakes" : ".mistakes",
};

// start app
$(function(){
  // create text
  for (var k = 0; k < code.length; k++){
    example = code[k];

    $(".textbar").append("<div class='string_of_code'></div>");

    for (var i = 0; i < example.length; i++) {
      if (k == 0 & i == 0){
        enter.next = example[0][0];
        $(".string_of_code").last().append("<span class='word'><span class='valid'></span><span class='active_disp' id='act'></span>" + "<span class='after'>" + example[i] + "</span></span>" + " ");
        continue;
      };
      $(".string_of_code").last().append("<span class='word'><span class='valid'></span><span class='after'>" + example[i] + "</span></span>"+" ");
    };
  };


  $(route("time")).text(metrics.time.toString());
  $(route("words")).text(metrics.words.toString());
  $(route("letters")).text(metrics.letters.toString());
  $(route("mistakes")).text(metrics.mistakes.toString());
});

// events
$(document).ready(function(){
  // if focus on .textbar
  $(".textbar").focusin(function(){
    options.focus = true;
    $("#act").attr("class", "active");});

  // if no focus on .textbar
  $(".textbar").focusout(function(){
    options.focus = false;
    $("#act").attr("class", "active_disp");});
  window.onkeydown = function(e){
    if (e.which == 32){
      e.preventDefault();
    };
  };

  // keypress
  $(document).keydown(function(event){

    if (event.metaKey | event.ctrlKey | event.altKey){
      return
    }

    if (options.focus){
      if (options.timer_val == false){
        metrics.time -= 1;
        $(route("time")).text(metrics.time);

        var counter = setInterval(function(){
          metrics.time -= 1;
          $(route("time")).text(metrics.time);

          if (metrics.time <= 0){
            $("#act").attr("class", "active_disp");
            $(".textbar").off();
            clearInterval(counter);
          }
        },1000);
        options.timer_val = true;
      };
      press_symbol(event.key);
    }});
});

// main function (keyboard trainer)
var press_symbol = function(symbol) {
  if (symbol == enter.next & options.valid == ""){
    valid_input();
  }
  else if (symbol == " "){
    space();
  }
  else if (symbol == "Enter"){
    entere();
  }
  else if (symbol == "Backspace"){
    backspace();
  }
  else if (symbol.length == 1){
    error(symbol);
  };
};

// if is valid symbol
var valid_input = function() {
  // elements
  word = $(".string_of_code")[enter.string_index].getElementsByClassName('word')[enter.word_index];
  valid = word.getElementsByClassName("valid")[0];
  after = word.getElementsByClassName("after")[0];
  symbol = code[enter.string_index][enter.word_index][enter.char_index];

  // redacting
  valid.innerText += symbol;
  after.innerText = code[enter.string_index][enter.word_index].substr(enter.char_index + 1);

  // exiting
  enter.char_index += 1;
  enter.next = code[enter.string_index][enter.word_index][enter.char_index];
};


var space = function() {
  if (enter.char_index < 1 & options.valid.length < 1 | enter.word_index + 1 == code[enter.string_index].length) {
    return
  };

  last_word = $(".string_of_code")[enter.string_index].getElementsByClassName('word')[enter.word_index]

  if (last_word.getElementsByClassName('after')[0].innerText.length >= 1 & options.valid == ""){
    options.valid = "no";
    last_word.getElementsByClassName('valid')[0].setAttribute("class", "no_valid");
  }

  last_word.getElementsByClassName('after')[0].remove();
  last_word.getElementsByClassName('active')[0].remove();

  if (options.valid == "")  {
    ch_metrics("letters", metrics.letters + code[enter.string_index][enter.word_index].length);
    ch_metrics("words", metrics.words + 1);
    options.correct += 1
  }
  else {
    options.no_correct += 1
  };
  update_mistakes()

  enter.word_index += 1;
  enter.char_index = 0;
  enter.next = code[enter.string_index][enter.word_index][0];

  word = $(".string_of_code")[enter.string_index].getElementsByClassName('word')[enter.word_index];
  word.innerHTML = "<span class='valid'></span><span class='active' id='act'></span><span class='after'>" + code[enter.string_index][enter.word_index] + "</span>";

  options.valid = '';
};


var entere = function() {
  if (enter.word_index + 1 < code[enter.string_index].length | enter.char_index < 1 & options.valid.length < 1 | enter.string_index + 1 == code.length){
    return
  };

  last_string = $(".string_of_code")[enter.string_index];

  if (last_string.getElementsByClassName('word')[enter.word_index].getElementsByClassName('after')[0].innerText.length >= 1 & options.valid == ""){
    options.valid = "no";
    $(".string_of_code")[enter.string_index].getElementsByClassName('word')[enter.word_index].getElementsByClassName('valid')[0].setAttribute("class", "no_valid");
  };

  last_string.getElementsByClassName('word')[enter.word_index].getElementsByClassName('active')[0].remove();
  last_string.getElementsByClassName('word')[enter.word_index].getElementsByClassName('after')[0].remove();

  if (options.valid == "")  {
    ch_metrics("letters", metrics.letters + code[enter.string_index][enter.word_index].length);
    ch_metrics("words", metrics.words + 1);
    options.correct += 1
  }
  else {
    options.no_correct += 1
  };
  update_mistakes()

  enter.string_index += 1;
  enter.word_index = 0;
  enter.char_index = 0;
  enter.next = code[enter.string_index][enter.word_index][0];

  word = $(".string_of_code")[enter.string_index].getElementsByClassName('word')[enter.word_index];
  word.innerHTML = "<span class='valid'></span><span class='active' id='act'></span><span class='after'>" + code[enter.string_index][enter.word_index] + "</span>";

  options.valid = "";
  if (enter.string_index > 3) {
    document.getElementsByClassName("textbar")[0].scrollTop += 30;
  }
};


var error = function(symbol) {
  word = $(".string_of_code")[enter.string_index].getElementsByClassName('word')[enter.word_index];
  if (options.valid == "") {
    valid = word.getElementsByClassName("valid")[0];
  }
  else {
    valid = word.getElementsByClassName("no_valid")[0];
  }

  valid.innerText += symbol;
  if (options.valid == "") {
    word.getElementsByClassName('valid')[0].setAttribute("class", "no_valid");
  };

  options.valid += symbol;
};


var backspace = function() {
  word = $(".string_of_code")[enter.string_index].getElementsByClassName('word')[enter.word_index];
  after = word.getElementsByClassName("after")[0];

  if (options.valid == "" & enter.char_index >= 1) {
    enter.char_index -= 1;
    valid = word.getElementsByClassName("valid")[0];
    valid.innerText = code[enter.string_index][enter.word_index].substring(0, enter.char_index);
    after.innerText = code[enter.string_index][enter.word_index].substring(enter.char_index, code[enter.string_index][enter.word_index].length);
    enter.next = code[enter.string_index][enter.word_index][enter.char_index];
  }
  else {

    if (options.valid == ""){
      valid = word.getElementsByClassName("valid")[0];
    }
    else {
      valid = word.getElementsByClassName("no_valid")[0];
    }
    options.valid = options.valid.substring(0, options.valid.length-1);
    valid.innerText = code[enter.string_index][enter.word_index].substring(0, enter.char_index) + options.valid;
    after.innerText = code[enter.string_index][enter.word_index].substring(enter.char_index, code[enter.string_index][enter.word_index].length);

    if (options.valid == ""){
        valid.setAttribute("class", "valid");
    }
  }
};
