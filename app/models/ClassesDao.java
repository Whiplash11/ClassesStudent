package models;

import play.db.jpa.GenericModel;

import java.util.List;

public class ClassesDao extends GenericModel {
    public List<Classes> getAllClasses(){
        List<Classes> allClasses = Classes.findAll();
        for (Classes classes : allClasses){
            System.out.println(classes);
        }
        return allClasses;
    }

    public Classes getClassesById(String cId){
        Classes classes = Classes.findById(cId);
        return classes;
    }
    public void deleteClass(Classes classes){
        classes.delete();
    }

//    public void updateClasses(Classes classes){
//        classes.save();
//    }
//
//    public void deleteClasses(Classes classes){
//        classes.save();
//    }
}
