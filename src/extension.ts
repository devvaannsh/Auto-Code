import { start } from 'repl';
import * as vscode from 'vscode';

// This method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('auto-code', () => {

		// the file which is currently active
		const editor = vscode.window.activeTextEditor;
		if (editor){
			const selection = editor.selection; 	// to select the editor

			// fetch the selected text...this is the main text which we have to modify
			const text : string = editor.document.getText(selection);
				
			if (text){  // make sure some text is selected
				// transformCode is the function which applies the logic and converts the code
				const transformedCode : string = transformCode(text);

				// Replace the selected code with the transformed code
				editor.edit(editBuilder => {
					editBuilder.replace(selection, transformedCode);
				});
			}	
		}
	});

	context.subscriptions.push(disposable);
}


// Function to transform code by replacing line numbers with incremented values
function transformCode(userCode: string) {
    let modifiedCode: string = ``;  // The modified string
    let startingNumber: string = '';   // This will hold the number from where the count starts
    let counter: number = -1;   // This will hold the current number that will replace the old number, it will get incremented by 1 for every next line
    let indx: number = 0;   // Index variable for iterating through the input code string
    let tempIndx: number = 0;  // An index variable for temporary checks
    let currCharacter: string = '';  // This variable will hold the current character that is to be appended to the new string

    // Loop through each character in the input code string
    for (indx = 0; indx < userCode.length; indx++) {

        // Encountering a \n (newline) character in the string
        if (userCode[indx] == '\n') {
            // Check if a counter has been initialized and the previous character is not a newline
            if (counter != -1 && userCode[indx - 1] != '\n') {
                counter += 1;  // Increment the counter
            }
            currCharacter = '\n';  // Set the current character to newline
        }

        // When the character is not a number 
        else if (!"0123456789".includes(userCode[indx])) {
            currCharacter = userCode[indx];  // Set the current character to the non-number character
        }

        // When the character is a number
        else {
            // If the starting number is still unknown, i.e., when startingNumber is an empty string
            if (!startingNumber) {
                tempIndx = indx; // Save the current index for reference

                // Extract the starting number and update the counter
                while ("0123456789".includes(userCode[tempIndx])) {
                    startingNumber += userCode[tempIndx]; // Build the starting number character by character
                    currCharacter += userCode[tempIndx]; // Include the digit in the current character
                    tempIndx += 1; // Move to the next character
                }

                counter = Number(startingNumber); // Convert the extracted starting number to a numeric value
                indx = tempIndx - 1;  // Update the index to the last digit of the starting number for the main loop to continue correctly
            }
            else {    // when starting number is known
                tempIndx = indx;
                // Skip the consecutive digits of the existing number
                while ("0123456789".includes(userCode[tempIndx])) {
                    tempIndx += 1;
                }
                indx = tempIndx - 1;  // Update the index to the last digit of the existing number
                currCharacter = String(counter);  // Set the current character to the counter value
            }
        }

        modifiedCode += currCharacter;  // Append the current character to the modified code string
        currCharacter = '';  // Reset the current character for the next iteration
    }

    return modifiedCode;  // Return the transformed code
}


// This method is called when the extension is deactivated
export function deactivate() {}
