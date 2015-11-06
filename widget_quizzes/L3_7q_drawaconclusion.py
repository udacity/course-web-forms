complicated_passwords = widget_inputs["check1"]
registration_gates_oncheckout = widget_inputs["check2"]
suggesting_products = widget_inputs["check3"]
name_inputs_for_shipping = widget_inputs["check4"]

comments = []
def commentizer(new):
    if new not in comments:
        comments.append(new)

is_correct = False

if complicated_passwords:
    is_correct = is_correct and False
    commentizer("Take another look at the first one. Complicated passwords could be annoying, but they are also fairly common.")
else:
    is_correct = True

if not registration_gates_oncheckout:
    is_correct = is_correct and False
    commentizer("Take another look at the second one. Does it add an extra step before users convert?")
else:
    is_correct = is_correct and True

if suggesting_products:
    is_correct = is_correct and False
    commentizer("Take another look at the third one. Do suggested products get in the way of checkout?")
else:
    is_correct = is_correct and True

if name_inputs_for_shipping:
    is_correct = is_correct and False
    commentizer("Take another look at the last one. Is it out of the norm to ask for a name for a shipping address?")
else:
    is_correct = is_correct and True

if is_correct:
    commentizer("Great job! Keeping registration gates out of the way will lead to faster checkouts and more conversions.")

grade_result["comment"] = "\n\n".join(comments)
grade_result["correct"] = is_correct