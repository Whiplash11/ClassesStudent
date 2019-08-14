package models;

import play.db.jpa.GenericModel;

import java.util.List;

/**
 * @author
 */
public class StudentDao extends GenericModel {
    public List<Students> getAllStudents(){
        List<Students> allStudents = Students.findAll();
        for (Students students : allStudents){
            System.out.println(students);
        }
        return allStudents;
    }

    public Students getStudentById(String sId){
        Students students = Students.findById(sId);
        return students;
    }

    public Students  search(String sId){

        List<Students> list = Students.find("sId = ?1", sId).first();
        if(list.size() == 0){
            return null;
        }else{
            return list.get(0);
        }

    }
    public void deleteStudents(Students students){

            students.delete();


    }
    public void updateStudents(Students students){

        students.save();
    }


}
