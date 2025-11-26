package com.ideen.cardatahouse.domain;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(exported = false)
public interface AppUserRepository extends CrudRepository<AppUser, Long> {

    /**
     * 根据用户名（username）查找用户。
     * Spring Data JPA 会根据方法名自动生成查询实现 (SELECT * FROM app_user WHERE username = ?)。
     * * @param username 要查找的用户名
     * @return 包含 AppUser 的 Optional 对象，如果找不到则返回 Optional.empty()
     */
    Optional<AppUser> findByUsername(String username);
    
    /**
     * 检查用户是否已存在（通常用于注册时的重复检查）。
     *
     * @param username 要检查的用户名
     * @return 如果存在则返回 true
     */
    //boolean existsByUsername(String username);
}