package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
@Table(name = "grade")
public class Grade extends GenericModel {
    @Id
    @OneToOne
    @JoinColumn(name = "sid")
    public Students sId;
    @Column(name = "语文")
    public String chinese;
    @Column(name = "数学")
    public String maths;
    @Column(name = "英语")
    public String english;

    public Grade() {
        super();
    }

    public Grade(Students sId, String chinese,String maths,String english) {
        super();
        this.sId = sId;
        this.chinese = chinese;
        this.english = english;
        this.maths = maths;
    }
}
