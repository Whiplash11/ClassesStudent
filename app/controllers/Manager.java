package controllers;

import models.*;

import play.mvc.Controller;

import java.util.List;


/**
 * @author
 */
public class Manager extends Controller {

    private static ClassesDao classesDao = new ClassesDao();
    private static StudentDao studentDao = new StudentDao();
    private static GradeDao gradeDao = new GradeDao();
    /**
     * 班级列表
     */
    public static void getAllClasses(){
        List<Classes> allClasses = Classes.findAll();
        render(allClasses);
    }

    /**
     * 查询班级
     * @param cId
     */
    public static void searchClasses(String cId){
        String id = String.valueOf(cId);
        Classes classes = classesDao.getClassesById(id);
        render(classes);
    }

    /**
     * 进入添加班级
     */
    public static void intoAddClasses(){
        render();
    }

    /**
     * 添加班级
     * @param classes
     */
    public static void addClasses(Classes classes){
        String classId = params.get("classId");
        String className = params.get("className");
        Classes addClass = new Classes();
        addClass.cId = classId;
        addClass.cName = className;
        classes.save();
        getAllClasses();
    }

    public static void deleteClasses(String cId){
        String id = String.valueOf(cId);
        Classes classes = classesDao.getClassesById(id);
        classesDao.deleteClass(classes);
        getAllClasses();
    }


    /**
     * 学生列表
     */
    public static void getAllStudents(){
//         allStudents = Students.findAll();
        List<Classes> allClasses = Classes.findAll();
        List<Students> allStudents = Students.find(" order by sId ").fetch();
        render(allStudents,allClasses);
    }


    /**
     * 查询学生
     * @param
     */
    public static void searchStudents(String sId){
        String id = String.valueOf(sId);
        Students searchStudent = studentDao.getStudentById(id);

        render(searchStudent);
    }


    /**
     * 进入添加学生
     */
    public static void intoAddStudents(){
        render();
    }

    /**
     * 添加学生
     * @param
     */
    public static void addStudents(){
        String studentId = params.get("studentId");
        String studentName = params.get("studentName");
        String classId = params.get("classId") ;
        Students addStudent = new Students();
        addStudent.cId = classId;
        addStudent.sId = studentId;
        addStudent.sName = studentName ;
        addStudent.save();
        getAllStudents();
    }

    /**
     * 修改学生信息
     * @param
     */
    public static void intoUpdateStudents(String sId){
        String id = String.valueOf(sId);
        Students updateStudent = studentDao.getStudentById(id);
        renderArgs.put("updateStudent",updateStudent);
        render();
    }

    /**
     * 修改成功
     * @param
     */
    public static void updateStudentsSuccess(){
        String sId = params.get("sId");
        Students students = new Students();
        Students.find(sId);
        students.sId=sId;
        students.save();
        getAllStudents();
    }

    /**
     * 删除学生
     * @param
     */
    public static void deleteStudents(String sId){
        String id = String.valueOf(sId);
        Students deleteStudent = studentDao.getStudentById(id);
        boolean x;
        studentDao.deleteStudents(deleteStudent);
        getAllStudents();
    }


    /**
     * 显示成绩
     */
    public static void showGrade(Students sId){
        String id = String.valueOf(sId);
        Grade grade = Grade.findById(id);
        renderArgs.put("grade",grade);

//        String maths = params.get("matchs");
//        String english = params.get("english");
//        String chinese = params.get("chinese");
//        String id = String.valueOf(sId);
//        Grade grade = Grade.findById(id);
//        grade.maths = maths;
//        grade.english = english;
//        grade.chinese = chinese;

    }


    public static void updateGradeSuccess(){
        String sId = params.get("sId");

        Grade grade = new Grade();
        String id = String.valueOf(sId);
        grade = Grade.findById(id);
        Grade.find(sId);
        Students students = new Students();
        students.sId=sId;

        grade.save();

    }

}
