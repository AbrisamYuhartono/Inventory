# ILMATE Inventory Management System - Entity Relationship Diagram

## Database Schema Overview

This ERD represents the complete database structure for the ILMATE Inventory Management System, showing all entities, their attributes, and relationships.

## Entities and Relationships

### 1. Users
**Primary Key:** user_id (UUID)
- user_id (UUID, PK)
- name (VARCHAR, NOT NULL)
- email (VARCHAR, UNIQUE, NOT NULL)
- department (VARCHAR, NOT NULL)
- role (ENUM: 'Admin', 'Manager', 'User', NOT NULL)
- phone (VARCHAR, NULLABLE)
- join_date (TIMESTAMP, DEFAULT NOW())
- is_active (BOOLEAN, DEFAULT TRUE)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())

### 2. Rooms
**Primary Key:** room_id (UUID)
- room_id (UUID, PK)
- name (VARCHAR, NOT NULL)
- description (TEXT, NULLABLE)
- building (VARCHAR, NULLABLE)
- floor (INTEGER, NULLABLE)
- capacity (INTEGER, NULLABLE)
- item_count (INTEGER, DEFAULT 0)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())

### 3. Categories
**Primary Key:** category_id (UUID)
- category_id (UUID, PK)
- name (VARCHAR, UNIQUE, NOT NULL)
- description (TEXT, NULLABLE)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())

### 4. Items
**Primary Key:** item_id (UUID)
**Foreign Keys:** room_id, category_id
- item_id (UUID, PK)
- name (VARCHAR, NOT NULL)
- description (TEXT, NULLABLE)
- category_id (UUID, FK → Categories.category_id)
- room_id (UUID, FK → Rooms.room_id)
- status (ENUM: 'Available', 'Lended', 'Broken', DEFAULT 'Available')
- serial_number (VARCHAR, UNIQUE, NOT NULL)
- qr_code (VARCHAR, UNIQUE, NOT NULL)
- purchase_date (DATE, NULLABLE)
- purchase_price (DECIMAL(10,2), NULLABLE)
- warranty_expiry (DATE, NULLABLE)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())

### 5. Lending_Records
**Primary Key:** lending_id (UUID)
**Foreign Keys:** item_id, user_id, approved_by
- lending_id (UUID, PK)
- item_id (UUID, FK → Items.item_id)
- user_id (UUID, FK → Users.user_id)
- approved_by (UUID, FK → Users.user_id, NULLABLE)
- lend_date (TIMESTAMP, DEFAULT NOW())
- expected_return_date (DATE, NOT NULL)
- actual_return_date (TIMESTAMP, NULLABLE)
- status (ENUM: 'Active', 'Returned', 'Overdue', DEFAULT 'Active')
- notes (TEXT, NULLABLE)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())

### 6. Lending_Documents
**Primary Key:** document_id (UUID)
**Foreign Keys:** lending_id
- document_id (UUID, PK)
- lending_id (UUID, FK → Lending_Records.lending_id)
- document_url (VARCHAR, NOT NULL)
- document_type (ENUM: 'PDF', 'DOC', DEFAULT 'PDF')
- generated_at (TIMESTAMP, DEFAULT NOW())

### 7. System_Settings
**Primary Key:** setting_id (UUID)
- setting_id (UUID, PK)
- company_name (VARCHAR, NOT NULL)
- company_address (TEXT, NULLABLE)
- company_phone (VARCHAR, NULLABLE)
- company_email (VARCHAR, NULLABLE)
- max_lending_days (INTEGER, DEFAULT 14)
- require_approval (BOOLEAN, DEFAULT FALSE)
- enable_notifications (BOOLEAN, DEFAULT TRUE)
- auto_generate_qr (BOOLEAN, DEFAULT TRUE)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())

### 8. Notifications
**Primary Key:** notification_id (UUID)
**Foreign Keys:** user_id, lending_id
- notification_id (UUID, PK)
- user_id (UUID, FK → Users.user_id)
- lending_id (UUID, FK → Lending_Records.lending_id, NULLABLE)
- type (ENUM: 'overdue', 'reminder', 'approval', 'return')
- title (VARCHAR, NOT NULL)
- message (TEXT, NOT NULL)
- is_read (BOOLEAN, DEFAULT FALSE)
- created_at (TIMESTAMP, DEFAULT NOW())

### 9. Audit_Logs
**Primary Key:** log_id (UUID)
**Foreign Keys:** user_id
- log_id (UUID, PK)
- user_id (UUID, FK → Users.user_id)
- action (VARCHAR, NOT NULL)
- entity_type (VARCHAR, NOT NULL)
- entity_id (UUID, NOT NULL)
- old_values (JSON, NULLABLE)
- new_values (JSON, NULLABLE)
- ip_address (VARCHAR, NULLABLE)
- user_agent (TEXT, NULLABLE)
- created_at (TIMESTAMP, DEFAULT NOW())

## Relationships

### One-to-Many Relationships

1. **Rooms → Items** (1:N)
   - One room can contain many items
   - Each item belongs to exactly one room

2. **Categories → Items** (1:N)
   - One category can have many items
   - Each item belongs to exactly one category

3. **Users → Lending_Records** (1:N) - Borrower
   - One user can have many lending records
   - Each lending record belongs to exactly one user (borrower)

4. **Users → Lending_Records** (1:N) - Approver
   - One user (admin/manager) can approve many lending records
   - Each lending record can be approved by one user

5. **Items → Lending_Records** (1:N)
   - One item can have many lending records (history)
   - Each lending record is for exactly one item

6. **Lending_Records → Lending_Documents** (1:N)
   - One lending record can have multiple documents
   - Each document belongs to exactly one lending record

7. **Users → Notifications** (1:N)
   - One user can receive many notifications
   - Each notification belongs to exactly one user

8. **Lending_Records → Notifications** (1:N)
   - One lending record can generate multiple notifications
   - Each notification can be related to one lending record

9. **Users → Audit_Logs** (1:N)
   - One user can have many audit log entries
   - Each audit log entry belongs to exactly one user

## Indexes for Performance

### Primary Indexes
- All primary keys are automatically indexed

### Secondary Indexes
- `idx_items_status` ON Items(status)
- `idx_items_room` ON Items(room_id)
- `idx_items_category` ON Items(category_id)
- `idx_items_serial` ON Items(serial_number)
- `idx_lending_status` ON Lending_Records(status)
- `idx_lending_dates` ON Lending_Records(lend_date, expected_return_date)
- `idx_lending_user` ON Lending_Records(user_id)
- `idx_lending_item` ON Lending_Records(item_id)
- `idx_users_email` ON Users(email)
- `idx_users_department` ON Users(department)
- `idx_notifications_user_read` ON Notifications(user_id, is_read)
- `idx_audit_logs_user_date` ON Audit_Logs(user_id, created_at)

## Business Rules and Constraints

### Data Integrity Rules
1. **Item Status Constraint**: Items can only be 'Available', 'Lended', or 'Broken'
2. **User Role Constraint**: Users can only have roles 'Admin', 'Manager', or 'User'
3. **Lending Status Constraint**: Lending records can only be 'Active', 'Returned', or 'Overdue'
4. **Serial Number Uniqueness**: Each item must have a unique serial number
5. **Email Uniqueness**: Each user must have a unique email address
6. **QR Code Uniqueness**: Each item must have a unique QR code

### Business Logic Rules
1. **Active Lending Limit**: An item can only have one active lending record at a time
2. **Return Date Logic**: Actual return date must be after lend date
3. **Status Synchronization**: Item status must reflect current lending status
4. **Approval Workflow**: If approval is required, lending records must have approved_by set
5. **Overdue Detection**: System automatically marks records as overdue when expected_return_date passes

## Views for Common Queries

### Active Lendings View
```sql
CREATE VIEW active_lendings AS
SELECT 
    lr.lending_id,
    lr.lend_date,
    lr.expected_return_date,
    i.name as item_name,
    i.serial_number,
    u.name as user_name,
    u.department,
    r.name as room_name
FROM lending_records lr
JOIN items i ON lr.item_id = i.item_id
JOIN users u ON lr.user_id = u.user_id
JOIN rooms r ON i.room_id = r.room_id
WHERE lr.status = 'Active';
```

### Overdue Items View
```sql
CREATE VIEW overdue_items AS
SELECT 
    lr.lending_id,
    lr.expected_return_date,
    CURRENT_DATE - lr.expected_return_date as days_overdue,
    i.name as item_name,
    u.name as user_name,
    u.email as user_email
FROM lending_records lr
JOIN items i ON lr.item_id = i.item_id
JOIN users u ON lr.user_id = u.user_id
WHERE lr.status = 'Active' 
AND lr.expected_return_date < CURRENT_DATE;
```

### Item Utilization View
```sql
CREATE VIEW item_utilization AS
SELECT 
    i.item_id,
    i.name,
    i.serial_number,
    COUNT(lr.lending_id) as total_lendings,
    AVG(EXTRACT(DAY FROM (lr.actual_return_date - lr.lend_date))) as avg_lending_days
FROM items i
LEFT JOIN lending_records lr ON i.item_id = lr.item_id
WHERE lr.status = 'Returned'
GROUP BY i.item_id, i.name, i.serial_number;
```

This ERD provides a comprehensive foundation for the ILMATE Inventory Management System, ensuring data integrity, performance, and scalability while supporting all the business requirements identified in the application.