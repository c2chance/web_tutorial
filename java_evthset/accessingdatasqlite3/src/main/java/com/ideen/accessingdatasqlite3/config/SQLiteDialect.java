package com.ideen.accessingdatasqlite3.config;

import org.hibernate.dialect.Dialect;
// ...existing code...

public class SQLiteDialect extends Dialect {
    public SQLiteDialect() {
        // Function registration in Hibernate 6.x+ is done via SqmFunctionRegistry, typically in a custom Dialect constructor or via configuration.
        // For most Spring Boot apps, custom functions can be registered via beans or config, so this may be left empty unless needed.
    }

    // Identity and limit support are now handled differently in Hibernate 6.x+.
    // If you need custom SQL for identity or limit, override appropriate methods or use configuration.
    // For most Spring Boot + SQLite setups, the default Dialect is sufficient unless you need special behavior.
}