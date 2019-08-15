package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;

/**
 * @author
 */

@Entity
@Table(name = "classes")
public class Classes extends GenericModel {
    @Id
    public String cId;
    @Column
    public String cName;

    public Classes() {
        super();
    }

    public Classes(String cId, String cName) {
        super();
        this.cName = cName;
        this.cId = cId;
    }
}
