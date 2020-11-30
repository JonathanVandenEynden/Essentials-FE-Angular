# Essentials E1 - Angular

https://essentialstoolkit.netlify.app/

Welcome to the Angular web application for the Essentials toolkit. This application is accessible for both change managers and administrators. To login as administrator, please visit https://essentialstoolkit.netlify.app/adminLogin

## Admin

### Test accounts

- Jonathan
	- email: Jonathan.vandeneyndenvanlysebeth@essentials.com
	- password: P@ssword1
- Simon
	- email: simon.dewilde@essentials.com
	- password: P@ssword1

The admin is an employee of the Essentials Corporation. This person has access to all the organizations he or she has created. On the home screen there is an overview of all organizations of the administrator.

The admin can create an organization by clicking on the 'add organization'- button. The organization gets a name, which will be used as domain for the email addresses of the employees, an a csv file, constructed as [this one](https://github.com/HoGent-Projecten3/projecten3-2021-angular-e1/blob/master/example_employees.csv). Note that the first employee in this csv will be assigned the role of first change manager of the organization. Each employee will get a unique email-address, consisting of there firstname, lastname and the organization name (ex. jane.doe@organization.com), and a password consisting of "P@ssword1" and there initials (ex. P@ssword1JD).

## Change Manager

### Test accounts

- Sukrit
	- email: Sukrit.bhattacharya@hogent.com
	- password: P@ssword1

The change manager can see which change initiatives are active. Change initiatives can be created, edited and deleted. Each change initiative has a road map, which represent the different steps in a change, with a survey. These surveys will be available to the employees to be filled in. This way, the change manager can gauge the mood of a specific change in the dashboard, and make alterations when needed. Surveys can contain simple questions, like yes/no, ranged or open questions, but also more detailed questions like multiple-choice. The survey-creation form, as well as all other forms, help the change manager to create new items with little effort.



