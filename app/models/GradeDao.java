package models;

import play.db.jpa.GenericModel;

public class GradeDao extends GenericModel {
    public Grade getGradeById(String sId){
        Grade grade =Grade.findById(sId);
        return grade;
    }
    public void updateGrade(Grade grade){

        grade.save();
    }
}
