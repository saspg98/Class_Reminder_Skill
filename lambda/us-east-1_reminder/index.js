//amazon alexa sdk package for handling requests and responses
const Alexa = require('ask-sdk-core');
//amazon date parser to parse AMAZON.DATES to javascipt Date() format
const AmazonDateParser = require('amazon-date-parser');
//creating instance of dynamoDB
const aws = require('aws-sdk');
const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});

//global permission for alexa to set reminders
const PERMISSIONS = ['alexa::alerts:reminders:skill:readwrite'];

//Users Timetable for the classes or lectures
let TIMETABLE = [
	{
		"8:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"9:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"10:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"11:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"12:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"13:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"14:00": {
		 "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"15:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"16:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"17:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"18:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		
	},
	{
		"8:00": {
		  "classTitle":"Operating Systems Tutorial",
		  "roomNo":"D313",
		  "alertToken":'',
		},
		"9:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"10:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"11:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"12:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"13:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"14:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"15:00": {
		  "classTitle":"Computer Architecture Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"16:00": {
		  "classTitle":"Theory of Computation Lecture",
		  "roomNo":"F106",
		  "alertToken":'',
		},
		"17:00": {
		  "classTitle":"Foundation of Data Science Lecture",
		  "roomNo":"F106",
		  "alertToken":'',
		},
		"18:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		
	},
	{
		"8:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"9:00": {
		  "classTitle":"Principles of Programming Language Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"10:00": {
		  "classTitle":"Operating Systems Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"11:00": {
		  "classTitle":"Human Computer Interaction Lecture",
		  "roomNo":"F107",
		  "alertToken":'',
		},
		"12:00": {
		  "classTitle":"Neural Network and Fuzzy Logic Lecture",
		  "roomNo":"F108",
		  "alertToken":'',
		},
		"13:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"14:00": {
		  "classTitle":"Principle of Programming Language Tutorial",
		  "roomNo":"TBA",
		  "alertToken":'',
		},
		"15:00": {
		 "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"16:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"17:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"18:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
	
	},
	{
		"8:00": {
		  "classTitle":"Theory of Computation Tutorial",
		  "roomNo":"F106",
		  "alertToken":'',
		},
		"9:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"10:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"11:00": {
		  "classTitle":"Computer Architecture Lab",
		  "roomNo":"D313",
		  "alertToken":'',
		},
		"12:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"13:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"14:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"15:00": {
		  "classTitle":"Computer Architecture Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"16:00": {
		  "classTitle":"Theory of Computation Lecture",
		  "roomNo":"F106",
		  "alertToken":'',
		},
		"17:00": {
		  "classTitle":"Foundation of Data Science Lecture",
		  "roomNo":"F106",
		  "alertToken":'',
		},
		"18:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
	},
	{
		"8:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"9:00": {
		  "classTitle":"Principles of Programming Language Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"10:00": {
		  "classTitle":"Operating Systems Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"11:00": {
		  "classTitle":"Human Computer Interaction Lecture",
		  "roomNo":"F107",
		  "alertToken":'',
		},
		"12:00": {
		  "classTitle":"Neural Network and Fuzzy Logic Lecture",
		  "roomNo":"F108",
		  "alertToken":'',
		},
		"13:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"14:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"15:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"16:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"17:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"18:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
	
	},
	{
		"8:00": {
		  "classTitle":"Computer Architecture Tutorial",
		  "roomNo":"F204",
		  "alertToken":'',
		},
		"9:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"10:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"11:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"12:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"13:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"14:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"15:00": {
		  "classTitle":"Computer Architecture Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"16:00": {
		  "classTitle":"Theory of Computation Lecture",
		  "roomNo":"F106",
		  "alertToken":'',
		},
		"17:00": {
		  "classTitle":"Foundation of Data Science Lecture",
		  "roomNo":"F106",
		  "alertToken":'',
		},
		"18:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
	},
	{
		"8:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"9:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"10:00": {
		  "classTitle":"Operating Systems Lecture",
		  "roomNo":"F105",
		  "alertToken":'',
		},
		"11:00": {
		  "classTitle":"Human Computer Interaction Lecture",
		  "roomNo":"F107",
		  "alertToken":'',
		},
		"12:00": {
		  "classTitle":"Neural Network and Fuzzy Logic Lecture",
		  "roomNo":"F108",
		  "alertToken":'',
		},
		"13:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"14:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"15:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"16:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"17:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
		"18:00": {
		  "classTitle":'',
		  "roomNo":'',
		  "alertToken":'',
		},
	},
]

const SKILL_NAME = "class reminder";
const enData = {
  translation: {
    LAUNCH_MESSAGE: 'Welcome to the '+ SKILL_NAME +', How can I Help!',
    WHAT_DO_YOU_WANT: 'What would you like to do?',
    NOTIFY_MISSING_PERMISSIONS: 'Please enable Reminder permissions in the Amazon Alexa app using the card I\'ve sent to your Alexa app.',
    HELP_MESSAGE: 'You can use this skill by asking something like: create a reminder, update timetable?',
    HELP_REPROMPT: 'What can I help you with?',
    FALLBACK_MESSAGE: 'The class reminder skill can\'t help you with that.  It can help you to manage your lectures schedule and set, update or delete reminder for the them. What can I help you with?',
    FALLBACK_REPROMPT: 'What can I help you with?',
    ERROR_MESSAGE: 'Sorry, an unexpected error occurred.',
    UNSUPPORTED_DEVICE: 'Sorry, this device doesn\'t support reminders.',
    STOP_MESSAGE: 'Bye! Thanks for using the Class Reminder!',
    NO_REMINDER: 'OK, I won\'t remind you.',
    NO_REMINDER_DELETE: 'OK, I won\'t delete the reminder',
    INVALID_CREATE_REQUEST: 'I was unable to create the requested reminder. Please try to create a new reminder.',
    INVALID_DELETE_REQUEST: 'I was unable to delete the requested reminder. Please try again! ',
  }
};
const day =  [ ["Sunday","SU"], ["Monday","MO"], ["Tuesday","TU"], ["Wednesday","WE"], ["Thursday","TH"], ["Friday","FR"], ["Saturday","SA"] ];

const LaunchRequestIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(enData.translation.LAUNCH_MESSAGE)
      .reprompt(enData.translation.LAUNCH_MESSAGE)
      .getResponse();
  }
};

const CreateReminderIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'CreateReminderIntent';
  },
  async handle(handlerInput) {
    const requestEnvelope = handlerInput.requestEnvelope;
    
    // check for confirmation.  if not confirmed, delegate
    	switch (requestEnvelope.request.intent.confirmationStatus) {
      	case 'CONFIRMED':
        	// intent is confirmed, so continue
        	console.log('Alexa confirmed intent, so clear to create reminder');
        	break;
      	case 'DENIED':
        	// intent was explicitly not confirmed, so skip creating the reminder
        	console.log('Alexa disconfirmed the intent; not creating reminder');
      		return handlerInput.responseBuilder
          	.speak(`${enData.translation.NO_REMINDER} ${enData.translation.WHAT_DO_YOU_WANT}`)
          	.reprompt(enData.translation.WHAT_DO_YOU_WANT)
          	.getResponse();
      	case 'NONE':
    		default:
        	console.log('delegate back to Alexa to get confirmation');
        	return handlerInput.responseBuilder
          	.addDelegateDirective()
          	.getResponse();
    	}
    	
    const subject = requestEnvelope.request.intent.slots.subject.value.trim();
    const date = new AmazonDateParser(requestEnvelope.request.intent.slots.date.value);
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);
    const type = requestEnvelope.request.intent.slots.type.value.trim();
    
    if(subject && type && date){
    	//constraints before requesting api to set reminder
    	if((startDate.getDate()!==endDate.getDate()) && (startDate.getMonth()!==endDate.getMonth()) && (startDate.getFullYear()!==endDate.getFullYear())){
    		return handlerInput.responseBuilder
    			.speak("I am unable to set reminder for the given date. Try again by setting alarm for a particular date.")
    			.getResponse();
    	}
    	// const currentTime = new Date();
    	// console.log(startDate);
    	// console.log(new Date());
    	// if(startDate.getTime()<(new Date(currentTime.getTime()+60000*(330+currentTime.getTimezoneOffset()))).getTime()){
    	// 	return handlerInput.responseBuilder
    	// 		.speak("Cannot set the reminder for a date before current date. Please try again!")
    	// 		.getResponse();
    	// }
    	
    	let time,detail,daySchedule;
    	//accessing data from dynamodb
    	const fetchParams = {
				ExpressionAttributeValues: {
					":v1": {
						S: day[startDate.getDay()][0]
					}
				},
				TableName : "tt-class-reminder",
				KeyConditionExpression: "days = :v1"
			};
    	daySchedule = await ddb.query(fetchParams).promise().then((data) => {
    		return data;
			});
		
			for(const [x,y] of Object.entries(daySchedule.Items[0])){
    		if(y.M && (y.M.classTitle.S!='null') && (y.M.classTitle.S.toLowerCase()==subject.toLowerCase()+' '+type)){
    				time = x;
    				detail = y.M;
    				break;
    		}
    	}
    	if(!(time && detail)){
    		return handlerInput.responseBuilder
    			.speak("You dont have any "+subject+" "+type+" on "+day[startDate.getDay()][0])
    			.getResponse();
    	}
    	if(detail.alertToken.S!='null'){
    		return handlerInput.responseBuilder
    			.speak("Reminder is already set for "+subject+" "+type+" on "+day[startDate.getDay()][0])
    			.getResponse();
    	}
    	//global permission to Alexa for barging in between for the reminder.
    	const permission = requestEnvelope.context.System.user.permissions;
    	if (!(permission && permission.consentToken)) {
      	return handlerInput.responseBuilder
        	.speak(enData.translation.NOTIFY_MISSING_PERMISSIONS)
        	.withAskForPermissionsConsentCard(PERMISSIONS)
        	.getResponse();
    	}
    	try{
      	const client = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        const reminderTime = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),parseInt(time.slice(0,2)),parseInt(time.slice(3,5)));
        const reminderRequest = {
        requestTime: reminderTime.toISOString().slice(0,-1),
        trigger: {
          type: 'SCHEDULED_ABSOLUTE',
          scheduledTime:'',
          timeZoneId: 'Asia/Kolkata',
          recurrence : {  freq : 'WEEKLY',
          	byDay:'',
          }
        },
        alertInfo: {
          spokenInfo: {
            content: [{
              locale: 'en-IN',
              text: 'Hurry! You have '+detail.classTitle.S+' '+type+' after ten minutes in room no. '+detail.roomNo.S,
            }],
          },
        },
        pushNotification: {
          status: 'ENABLED',
        },
      };
      reminderTime.setTime(reminderTime.getTime()-10*1000*60);
      reminderRequest.trigger.scheduledTime = reminderTime.toISOString().slice(0,-1);
      reminderRequest.trigger.recurrence.byDay=[day[startDate.getDay()][1]];
      console.log('sending request', reminderRequest);
      let reminderResponse = await client.createReminder(reminderRequest);
      // if(reminderResponse.statusCode==200)
      console.log(JSON.stringify(reminderResponse));
      detail.alertToken.S=reminderResponse.alertToken;
      const updateParams = {
      	TableName:"tt-class-reminder",
      	Key:{
      		"days":{
      			S:day[startDate.getDay()][0]
      		}
      	},
      	ExpressionAttributeNames: {
  				"#AT": time
  			}, 
      	ExpressionAttributeValues: {
  				":t": {
    				 M: detail
    			}
  			},
  			UpdateExpression: "SET #AT = :t"
      };
      ddb.updateItem(updateParams, function(err, data) {
  			if (err) console.log(err, err.stack); // an error occurred
  			else     console.log(updateParams);
  		});
  		
    }catch (error) {
      	if (error.name !== 'ServiceError') {
        	console.log(`error: ${error.stack}`);
        	const response = handlerInput.responseBuilder
          	              .speak(enData.translation.ERROR_MESSAGE)
            	            .getResponse();
        	return response;
      	}
      	throw error;
    	}

    	return handlerInput.responseBuilder
      	.speak("Reminder for "+subject+" "+type+" on "+day[startDate.getDay()][0]+" has been created")
      	.getResponse();
    }
    
    return handlerInput.responseBuilder
    	.speak(enData.translation.INVALID_CREATE_REQUEST)
    	.getResponse();
  }
};

const DeleteReminderIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'DeleteReminderIntent';
  },
  async handle(handlerInput){
    const requestEnvelope = handlerInput.requestEnvelope;
    
    // check for confirmation.  if not confirmed, delegate
    	switch (requestEnvelope.request.intent.confirmationStatus) {
      	case 'CONFIRMED':
        	// intent is confirmed, so continue
        	console.log('Alexa confirmed intent, so clear to delete reminder');
        	break;
      	case 'DENIED':
        	// intent was explicitly not confirmed, so skip creating the reminder
        	console.log('Alexa disconfirmed the intent; not deleting reminder');
      		return handlerInput.responseBuilder
          	.speak(`${enData.translation.NO_REMINDER_DELETE} ${enData.translation.WHAT_DO_YOU_WANT}`)
          	.reprompt(enData.translation.WHAT_DO_YOU_WANT)
          	.getResponse();
      	case 'NONE':
    		default:
        	console.log('delegate back to Alexa to get confirmation');
        	return handlerInput.responseBuilder
          	.addDelegateDirective()
          	.getResponse();
    	}
    
    const subject = requestEnvelope.request.intent.slots.subject.value.trim();
    const date = new AmazonDateParser(requestEnvelope.request.intent.slots.date.value);
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);
    const type = requestEnvelope.request.intent.slots.type.value.trim();
    
    if(subject && date && type){
    	//constraints before requesting api to set reminder
    	if((startDate.getDate()!==endDate.getDate()) && (startDate.getMonth()!==endDate.getMonth()) && (startDate.getFullYear()!==endDate.getFullYear())){
    		return handlerInput.responseBuilder
    			.speak("I am unable to set reminder for the given date. Try again by setting alarm for a particular date.")
    			.getResponse();
    	}
    	// if(startDate.getTime()<=(new Date()).getTime()){
    	// 	return handlerInput.responseBuilder
    	// 		.speak("Cannot set the reminder for a date before current date. Please try again!")
    	// 		.getResponse();
    	// }
    	let time,detail,daySchedule;
    	//accessing data from dynamodb
    	const fetchParams = {
				ExpressionAttributeValues: {
					":v1": {
						S: day[startDate.getDay()][0]
					}
				},
				TableName : "tt-class-reminder",
				KeyConditionExpression: "days = :v1"
			};
    	daySchedule = await ddb.query(fetchParams).promise().then((data) => {
    		return data;
			});
			
    	for(const [x,y] of Object.entries(daySchedule.Items[0])){
    		if(y.M && y.M.classTitle.S!='null' && y.M.classTitle.S.toLowerCase()==subject.toLowerCase()+' '+type){
    			time = x;
    			detail = y.M;
    			break;
    		}
    	}
    	
    	if(!detail){
    		return handlerInput.responseBuilder
    			.speak("You dont have any "+subject+" "+type+" on "+day[startDate.getDay()][0])
    			.getResponse();
    	}
    	if(detail.alertToken.S=='null'){
    		return handlerInput.responseBuilder
    			.speak("No reminder is set for "+subject+" "+type+" on "+day[startDate.getDay()][0])
    			.getResponse();
    	}
    	try{
    		const client = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
    		let reminderResponse = await client.deleteReminder(detail.alertToken.S);
    		detail.alertToken.S='null';
    		const updateParams = {
      	TableName:"tt-class-reminder",
      	Key:{
      		"days":{
      			S:day[startDate.getDay()][0]
      		}
      	},
      	ExpressionAttributeNames: {
  				"#AT": time
  			}, 
      	ExpressionAttributeValues: {
  				":t": {
    				 M: detail
    			}
  			},
  			UpdateExpression: "SET #AT = :t"
      };
      ddb.updateItem(updateParams, function(err, data) {
  			if (err) console.log(err, err.stack); // an error occurred
  			else     console.log(updateParams);
  		});
      
    }catch(error){
    		if (error.name !== 'ServiceError') {
        	console.log(`error: ${error.stack}`);
        	const response = handlerInput.responseBuilder
          	              .speak(enData.translation.ERROR_MESSAGE)
            	            .getResponse();
        	return response;
      	}
      	throw error;
    	}
    	
    	return handlerInput.responseBuilder
      	.speak("Reminder for "+subject+" "+type+" on "+day[startDate.getDay()][0]+" has been deleted")
      	.getResponse();
    }
    return handlerInput.responseBuilder
    	.speak(enData.translation.INVALID_DELETE_REQUEST)
    	.getResponse();
  }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(enData.translation.HELP_MESSAGE)
      .reprompt(enData.translation.HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackIntentHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(enData.translation.FALLBACK_MESSAGE)
      .reprompt(enData.translation.FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(enData.translation.STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    switch (error.statusCode) {
      case 400:
        return  handlerInput.responseBuilder
          .speak("Wrong data in JSON file!")
          .getResponse();
      case 401:
        return handlerInput.responseBuilder
          .speak(enData.translation.NOTIFY_MISSING_PERMISSIONS)
          .withAskForPermissionsConsentCard(PERMISSIONS)
          .getResponse();
      case 403:
        return handlerInput.responseBuilder
          .speak(`${enData.translation.UNSUPPORTED_DEVICE} ${enData.translation.WHAT_DO_YOU_WANT}`)
          .reprompt(enData.translation.WHAT_DO_YOU_WANT)
          .getResponse();
      default:
        return handlerInput.responseBuilder
          .speak(enData.translation.ERROR_MESSAGE)
          .getResponse();
    }
  },
};

const RequestLog = {
  async process(handlerInput) {
    console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
  },
};

const ResponseLog = {
  process(handlerInput) {
    console.log(`RESPONSE = ${JSON.stringify(handlerInput.responseBuilder.getResponse())}`);
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
          .addRequestHandlers(
            LaunchRequestIntentHandler,
            HelpIntentHandler,
            ExitHandler,
            FallbackIntentHandler,
            SessionEndedRequestHandler,
            CreateReminderIntentHandler,
            DeleteReminderIntentHandler,
          )
          .addRequestInterceptors(RequestLog)
          .addResponseInterceptors(ResponseLog)
          .addErrorHandlers(ErrorHandler)
          .withApiClient(new Alexa.DefaultApiClient())
          .lambda();
    