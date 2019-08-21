package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.List;

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
    public String cName;
//    @ManyToOne (cascade = CascadeType.ALL)
//    @JoinColumn(name = "class_id")
//    public Classes cId;


    public Students() {
        super();
    }

    public Students(String sId, String sName,String cName) {
        super();
        this.sId = sId;
        this.sName = sName;
        this.cName = cName;
    }

}
