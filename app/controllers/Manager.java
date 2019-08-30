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

    public static void centerStudent(){
        List<Classes> allClasses = Classes.findAll();
        List<Students> allStudents = Students.find(" order by sId ").fetch();
        render(allStudents,allClasses);
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
        String className = params.get("className") ;
        Students addStudent = new Students();
        addStudent.cName = className;
        addStudent.sId = studentId;
        addStudent.sName = studentName;
        addStudent.save();
        centerStudent();
    }

    /**
     * 修改学生信息
     * @param
     */
    public static void intoUpdateStudents(String sId){
        String id = String.valueOf(sId);
        Students updateStudent = Students.findById(id);
        renderArgs.put("updateStudent",updateStudent);

    }

    /**
     * 修改成功
     * @param
     */
    public static void updateStudentsSuccess(Students students){
//        String sId = params.get("sId");
//        Students students = new Students();
//        Students.find(sId);
//        students.sId=sId;
        studentDao.updateStudents(students);
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
        centerStudent();
    }


    /**
     * 显示成绩
     */
    public static void showGrade(){
        List<Students> students = Students.find(" order by sId ").fetch();
        List<Grade> grade = Grade.findAll();
        render(grade,students);
    }

    public static void addGrade(Grade grade){
        String sId = params.get("sId");
        String chinese = params.get("chinese");
        String english = params.get("english");
        String maths = params.get("maths");
        Grade addGrade = new Grade();
        addGrade.sId = sId;
        addGrade.chinese = chinese;
        addGrade.english = english;
        addGrade.maths = maths;
        grade.save();
        showGrade();
    }


    public static void updateGradeSuccess(String sId){
        String id = String.valueOf(sId);
        Grade grade =  Grade.findById(id);
        grade.save();
        showGrade();
    }


}
