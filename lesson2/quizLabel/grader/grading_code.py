is_correct = executor_result["is_correct"]
test_feedback = executor_result["test_feedback"]
test_comments = executor_result["test_comments"]
congrats = executor_result["congrats"]

feedback = ""
output = (test_comments + "\n" + test_feedback).strip()

if output == "":
    output = "No issues!"

if is_correct:
    feedback = congrats
else:
    feedback = "Not quite. Take a look at the feedback area for some pointers."

grade_result["correct"] = is_correct
grade_result["feedback"] = feedback 
grade_result["comment"] = output