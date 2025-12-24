package com.ideen;

public interface ClientListener {
    void clientAdded(ClientEvent event);
    void clientRemoved(ClientEvent event);
}
