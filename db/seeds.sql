INSERT INTO department (dept_name)
VALUES
('East Rec'),
('Project Space'),
('Front of House');

INSERT INTO job (title, salary, department_id)
VALUES 
('CEO',             175000,     2),
('President',       145000,     2),
('Vice President',  118000,     2),
('Rec Manager',     100000,     1),
('Project Manager', 80000,      3),
('Senior Planner',  65000,      1),
('Junior House',    54000,      3);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
('Lee',     'Boettcher',    1,     null),
('Kayla',   'Lime',         2,      1),
('David',   'Quinn',        3,      2),
('Gary',    'Anderson',     4,      null),
('Beth',    'Wright',       5,      3),
('Busy',    'Dawn',         6,      null),
('Erick',   'Angel',        7,      null);