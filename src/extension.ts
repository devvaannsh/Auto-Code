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
				console.log(text);
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

function transformCode(user_code : string){
	// the main logic will appear here

    // Logic -> `The algorithm processes a given text, taking the selected text as a parameter. Initially, it identifies the first numeric value within the text, designating it as the starting number. The counter variable is then initialized with the starting number. Subsequently, all numeric occurrences within the same line are substituted with this number. Upon encountering a newline character ('\n'), the counter is incremented by 1. This incremented counter value is employed as the replacement for all numeric instances in the next line, and while traversing we set the value of the curr_character we are traversing and add it to the modified string`

    let modified_text: string = ``;     
    let starting_number = null;
    let counter: number = -1;
    let indx: number = 0;
    let curr_character: string = ''
    for (indx = 0; indx < user_code.length; indx++){
        if (user_code[indx] == '\n' && counter != -1){
            counter += 1;
            curr_character = '\n';
        }
        else if (user_code[indx] >= '0' && user_code[indx] <= '9'){
            if (starting_number == null){
                starting_number = user_code[indx];
                counter = Number(starting_number);
                curr_character = starting_number;
            }
            else {
                curr_character = String(counter);
            }
        }
        else {
            curr_character = user_code[indx];
        }
        modified_text += curr_character;
    }
	return modified_text;
}

// This method is called when the extension is deactivated
export function deactivate() {}
