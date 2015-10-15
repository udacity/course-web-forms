change_title = widget_inputs["check1"]
consolidate_inputs = widget_inputs["check2"]
better_validation = widget_inputs["check3"]
add_more_questions = widget_inputs["check4"]

comments = []
def commentizer(new):
    if new not in comments:
        comments.append(new)

is_correct = False

if change_title:
    is_correct = is_correct and False
    commentizer("Take another look at the first one. Does the title need to be *more* descriptive?")
else:
    is_correct = True

if not consolidate_inputs:
    is_correct = is_correct and False
    commentizer("Take another look at the second one. Could some inputs be combined?")
else:
    is_correct = is_correct and True

if not better_validation:
    is_correct = is_correct and False
    commentizer("Take another look at the third one. Have you tried hitting submit? Could the validation messages be more useful?")
else:
    is_correct = is_correct and True

if add_more_questions:
    is_correct = is_correct and False
    commentizer("Take another look at the last one. Do you *really* need to know anything else to create an event? If not, then you probably don't need any more questions.")
else:
    is_correct = is_correct and True

if is_correct:
    commentizer("Great job! Remember that simplicity is king with forms.")

grade_result["comment"] = "\n\n".join(comments)
grade_result["correct"] = is_correct