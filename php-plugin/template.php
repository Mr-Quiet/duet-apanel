<?php
class TogglePage
{
    private $page;
    function __construct($parametr)
    {
        $this->page = $parametr['page'];
        $this->template($this->page);
    }


    public function json()
    {  
        $content = file_get_contents("../templates/".$this->page);
        $arr = [
            'page'=>$this->page,
            'content'=>$content
        ];
        return json_encode($arr);
    }
    private function template($page)
    {   
        if (is_file("../templates/$page")) {
            $this->page = $page;
        } else {
            $this->page = 'home.html';
        }
    }
}

if (isset($_POST) && !empty(($_POST))) {
    $template = new TogglePage([
        'page'=>  json_decode($_POST['data'],true),
    ]);   
    
    echo $template->json();
}
// var_dump(json_decode($_POST['data'],true));
// $template = new TogglePage([
//     'page'=>  '',
// ]);
// $template->json();
