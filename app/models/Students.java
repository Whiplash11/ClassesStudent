package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;

/**
 * @author
 */
@Entity
@Table(name = "student")
public class Students extends GenericModel {
    @Id
    public String sId;
    @Column
    public String sName;
    @Column
    public String cId;


    public Students() {
        super();
    }

    public Students(String sId, String sName,String cId) {
        super();
        this.sId = sId;
        this.sName = sName;
        this.cId = cId;
    }

}
