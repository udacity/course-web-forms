import re

date_input = widget_inputs["text1"].strip().lower()
time_input = widget_inputs["text2"].strip().lower()

comments = []
def commentizer(new):
    if new not in comments:
        comments.append(new)

is_correct = False

if re.search("^datetime$", date_input) or re.search("^datetime\-local$", date_input):
    is_correct = is_correct and False
    commentizer("Take another look at the first one. This input is *just* a date, not a date and time.")
elif not re.search("^date$", date_input):
    is_correct = is_correct and False
    commentizer("Take another look at the first one. Which type provides just a date?")
elif re.search("^date$", date_input):
    is_correct = True

if re.search("^datetime$", time_input) or re.search("^datetime\-local$", time_input):
    is_correct = is_correct and False
    commentizer("Take another look at the second one. This input is *just* a time, not a date and time.")
elif not re.search("^time$", time_input):
    is_correct = is_correct and False
    commentizer("Take another look at the second one. Which type provides just a time?")
elif re.search("^time$", time_input):
    is_correct = is_correct and True

if is_correct:
    commentizer("Nice! Keep these input types in mind as you develop your forms.")

if re.search("it\'s time", date_input) and re.search("for a date\!", time_input):
    comments = []
    commentizer("Let's go here! ![north seymour island beach](https://upload.wikimedia.org/wikipedia/commons/2/24/The_beach_at_North_Seymour_Island_in_the_Galapagos.jpeg)")
    is_correct = True

grade_result["comment"] = "\n\n".join(comments)
grade_result["correct"] = is_correct